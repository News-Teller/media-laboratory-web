import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Grid, Typography} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles"
import { CodeBlock, solarizedLight as codeTheme } from "react-code-blocks";

const texts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Facilisis leo vel fringilla est ullamcorper eget nulla. Eu nisl nunc mi ipsum. Varius sit amet mattis vulputate.",
  "Volutpat sed cras ornare arcu dui vivamus arcu felis. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Sapien pellentesque habitant morbi tristique. Facilisi etiam dignissim diam quis. Purus semper eget duis at tellus.",
  "Porttitor lacus luctus accumsan tortor posuere ac ut. Dignissim suspendisse in est ante in nibh. Pretium lectus quam id leo in vitae turpis. Amet justo donec enim diam vulputate ut. Arcu ac tortor dignissim convallis aenean et tortor.",
  "Vestibulum mattis ullamcorper velit sed ullamcorper. Nullam vehicula ipsum a arcu cursus. Egestas diam in arcu cursus. Vitae turpis massa sed elementum tempus egestas sed sed risus. Quis enim lobortis scelerisque fermentum dui faucibus.",
  "Nunc lobortis mattis aliquam faucibus purus in massa tempor. Sed adipiscing diam donec adipiscing tristique risus nec. Turpis massa sed elementum tempus egestas sed sed risus pretium. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Sit amet mattis vulputate enim nulla aliquet porttitor lacus.",
  "Et odio pellentesque diam volutpat. Condimentum mattis pellentesque id nibh tortor. Sed id semper risus in hendrerit. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Lacus vestibulum sed arcu non odio euismod lacinia.",
  "Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Sollicitudin nibh sit amet commodo nulla facilisi nullam. Augue lacus viverra vitae congue. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Et tortor consequat id porta.",
  "Molestie nunc non blandit massa enim nec dui nunc mattis. Aliquam faucibus purus in massa tempor nec feugiat. Velit aliquet sagittis id consectetur. Duis at tellus at urna condimentum mattis pellentesque. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices.",
  "Ultricies integer quis auctor elit sed vulputate mi sit amet. Vitae auctor eu augue ut lectus arcu bibendum at varius. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Dis parturient montes nascetur ridiculus mus mauris. Non diam phasellus vestibulum lorem sed.",
  "Malesuada fames ac turpis egestas integer eget. Et egestas quis ipsum suspendisse. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Viverra tellus in hac habitasse platea dictumst. Porttitor lacus luctus accumsan tortor.",
  "Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Nunc congue nisi vitae suscipit tellus mauris a. Vulputate ut pharetra sit amet aliquam id diam maecenas. Sit amet aliquam id diam maecenas. Aenean pharetra magna ac placerat vestibulum lectus mauris.",
  "Nisi vitae suscipit tellus mauris. Quis lectus nulla at volutpat diam ut venenatis tellus in. Sit amet nisl purus in mollis nunc. Elementum eu facilisis sed odio morbi quis commodo. Varius duis at consectetur lorem donec massa sapien faucibus et.",
  "Faucibus in ornare quam viverra orci sagittis eu. Tortor dignissim convallis aenean et. Bibendum ut tristique et egestas quis. Ullamcorper malesuada proin libero nunc. Neque convallis a cras semper.",
  "Tristique nulla aliquet enim tortor at auctor urna nunc. Arcu risus quis varius quam quisque id. Viverra justo nec ultrices dui sapien eget mi proin. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Amet luctus venenatis lectus magna fringilla urna.",
  "Facilisis gravida neque convallis a cras semper auctor. Dignissim suspendisse in est ante in nibh mauris. Arcu vitae elementum curabitur vitae nunc sed velit. Vitae congue eu consequat ac. Faucibus ornare suspendisse sed nisi lacus."
]

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomLoremIpsum(size = 1) {
  if (size === 0) {
    return [];
  } else if (size === 1) {
   return [texts[Math.floor(Math.random() * texts.length)]];
  } else if (size < texts.length) {
    return shuffle(texts).slice(0, size);
  } else {
    return shuffle(texts);
  }
};


const styles = (theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  cardContent: {
    padding: theme.spacing(0.5),
    paddingTop: 0,
  },
  popoverTrigger: {
    'borderBottom': '1px solid',
    color: '#69e',
    cursor: 'help',
  },
});

/*
  `getViews` builds the two views:
    - code: where we show the html code
    - jsx: the output, rendered from jsx elements
*/
const getViews = (cardItems, classes) => {
  const lorems = getRandomLoremIpsum((cardItems.length > 0) ? cardItems.length : 1);

  // Split lorem ipsum text to insert popover trigger element
  const elements = cardItems.map((item, index) => {
    const { id, title } = item;
    const text = lorems[index];

    // Split text to insert trigger element
    const splitted = text.split(' ');
    const sep = Math.floor(Math.random() * splitted.length);
    const first = splitted.slice(0, sep).join(' ');
    const second = splitted.slice(sep + 1).join(' ');

    const html = `\t<p>\n\t\t${first}\n\t\t<span data-toggle="popover" data-card-id="${id}">${title}</span>\n\t\t${second}\n\t</p>`;
    const jsx = (
      <p key={`jsx-p-${id}`}>
        {first}{' '}
        <span className={classes.popoverTrigger} data-toggle="popover" data-card-id={`${id}`}>{title}</span>
        {' '}{second}
      </p>
    );

    return [html, jsx];
  });

  const code = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cards tutorial</title>
  </head>
  <body>
    <div>
      ${elements.map(x => x[0]).join('\n')}
    </div>

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://news-teller.github.io/media-laboratory-web/popovers.js"></script>
  </body>
</html> `;

  const jsx = elements.map(x => x[1]);

  return [code, jsx];
};

function SplitView({ cardItems, classes }) {
  const [code, jsx] = getViews(cardItems, classes);

  return (
    <Grid container alignItems="stretch" spacing={2}>
      <Grid item component={Card} xs={8} className={classes.card}>
        <CardHeader title="Code" />
        <CardContent className={classes.cardContent}>
          <CodeBlock
            text={code}
            language={'html'}
            showLineNumbers={false}
            theme={codeTheme}
          />
        </CardContent>
      </Grid>
      <Grid item component={Card} xs={4} className={classes.card}>
        <CardHeader title="Result" />
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" align="justify" component="div">
            {jsx}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
    );
}

SplitView.propTypes = {
  cardItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
  })).isRequired,
};

export default withStyles(styles)(SplitView);
