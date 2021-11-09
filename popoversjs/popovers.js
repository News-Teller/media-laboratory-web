const reloadPopoversjsElements = (function (Popper) {
  // Ensure Popper
  if (typeof Popper === 'undefined') {
    console.error('Popper is required (https://popper.js.org)');
    return;
  }

  function getParams() {
    const script = document.currentScript;
    let params = {};

    // Parse params using HTML5 'data' Attribute
    script.getAttributeNames()
        .filter(name => name.startsWith('data-'))
        .forEach(name => { params[name.slice(5)] = script.getAttribute(name) });

    // Parse params using QueryString
    const query = script.src.replace(/^[^\?]+\??/,'');
    if (query) {
        query.split('&').forEach(item => {
        const pair = item.split('=');
        if (pair.length !== 2) return;

        // decodeURI doesn't expand "+" to a space.
        params[pair[0]] = decodeURI(pair[1]).replace(/\+/g, ' ');
        });
    }

    return params;
  }
  const params = getParams();

  // Fetch guidelines data
  let guidelinesData;

  fetch('https://news-teller.github.io/media-laboratory-web/guidelines.json').then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
  }).then(function (data) {
    if (data && data.guidelines) {
        guidelinesData = data.guidelines;
    }
  }).catch(function (err) {
    console.warn('Couldn\t fetch guidelines data: ', err);
  });

  function setStyle(name) {
    const css = `
    [data-toggle="NAME"] {
      white-space: nowrap;
    }

    .NAME {
      background-color: #fff;
      color: inherit;
      padding: 0 1rem;
      z-index: 15;
      width: 350px;
      border-radius: 5px;
      box-sizing: border-box;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: none;
    }

    .NAME[data-show] {
      display: block;
    }`;

    const style = document.createElement('style');
    style.innerHTML = css.replaceAll('NAME', name);
    document.head.prepend(style);
  };

  // Create tooltip element
  const tooltipClass = ('popover-class' in params) ? params['popover-class'] : 'popovercard';
  let tooltip;

  // Set styles
  if (!params['disable-css']) setStyle(tooltipClass);

  if (('popover-element' in params) && (params['popover-element']==='external')) {
    tooltip = document.body.querySelector('.' + tooltipClass);
  } else {
    tooltip = document.createElement('div');
    tooltip.classList.add(tooltipClass); tooltip.setAttribute('role', 'tooltip');
    tooltip.innerHTML = '<h3 class="popovercard-header"></h3><div class="popovercard-body"></div>';
    document.body.append(tooltip);
  }

  const tooltipTitle = tooltip.querySelector('.popovercard-header');
  const tooltipBody = tooltip.querySelector('.popovercard-body');

  if (!(tooltip && tooltipTitle && tooltipBody)) throw new Error('Missing popover elements');

  // Get trigger elemements
  let popoverTriggerList, popperInstanceList;

  function show(event, popoverIndex) {
    const trigger = event.target;
    const popperInstance = popperInstanceList[popoverIndex];

    const id = trigger.getAttribute('data-card-id');
    if (!id || !guidelinesData || !(id in guidelinesData)) return;

    // Set tooltip content
    tooltipTitle.innerHTML = guidelinesData[id]['term'];
    tooltipBody.innerHTML = guidelinesData[id]['definition'];

    // Make the tooltip visible
    tooltip.setAttribute('data-show', '');

    // Enable the event listeners
    popperInstance.setOptions({
        modifiers: [{ name: 'eventListeners', enabled: true }],
    });

    // Update its position
    popperInstance.update();
  }

  function hide(popoverIndex) {
    const popperInstance = popperInstanceList[popoverIndex];

    // Hide the tooltip
    tooltip.removeAttribute('data-show');

    // Disable the event listeners
    popperInstance.setOptions({
        modifiers: [{ name: 'eventListeners', enabled: false }],
    });
  }

  // Set event listeners
  const showEvents = ['mouseenter', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];

  // Activate popovers
  return function computePopoverElements() {
    popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="' + tooltipClass + '"]'));
    popperInstanceList = popoverTriggerList.map(function (popoverTriggerEl) {
      // eslint-disable-next-line no-undef
      return Popper.createPopper(popoverTriggerEl, tooltip);
    });

    // Hide all popovers by default
    popoverTriggerList.forEach(element => element.removeAttribute('data-show'));

    showEvents.forEach(event => {
        popoverTriggerList.forEach((element, index) =>
            element.addEventListener(event, function (e) { show(e, index) })
        );
    });

    hideEvents.forEach(event => {
        popoverTriggerList.forEach((element, index) =>
            element.addEventListener(event, function (_) { hide(index) })
        );
    });
  };
})(window['Popper']);

// Export main function
window.reloadPopoversjsElements = reloadPopoversjsElements;

// Run
reloadPopoversjsElements();
