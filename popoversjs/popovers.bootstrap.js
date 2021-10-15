(function (bootstrap) {
  // Ensure Bootstrap
  if (typeof bootstrap === 'undefined') {
    console.error('Bootstrap is required (https://getbootstrap.com/docs/4.5/getting-started/introduction/)');
    return;
  }

  function getBsVersion() {
    const version = bootstrap.Tooltip.VERSION;
    if (!version) {
      return undefined;
    }
    return parseInt(version[0], 10);
  }

  // Fetch guidelines data
  fetch('https://news-teller.github.io/media-laboratory-web/guidelines.json').then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }).then(function (data) {
    let guidelinesData;

    if (data && data.guidelines) {
      guidelinesData = data.guidelines;
    }

    const dataSelectorBase = (getBsVersion() === 5) ? 'data-bs-' : 'data-';

    // Enable popovers, see https://getbootstrap.com/docs/5.1/components/popovers/
    var popoverTriggerList = [].slice.call(document.querySelectorAll('['+ dataSelectorBase + 'toggle="popover"]'))

    // Populate content
    popoverTriggerList.forEach(element => {
      const id = element.getAttribute('data-card-id');
      if (!id || !guidelinesData || !(id in guidelinesData)) return;

      // Set tooltip content via boostrap attributes
      element.setAttribute('title', guidelinesData[id]['term']);
      element.setAttribute(dataSelectorBase + 'content', guidelinesData[id]['definition']);
    });

    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
  }).catch(function (err) {
    console.warn('Couldn\'t fetch guidelines data: ', err);
  });
})(window['bootstrap']);
