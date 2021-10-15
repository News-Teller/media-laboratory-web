import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HeroContainer } from '../Components'
import { CopyBlock, solarizedLight } from "react-code-blocks";
import sharedStyles from '../SharedStyles';

const links = [
  "https://embed.newsteller.io/5eebe705f89e",
  "https://embed.newsteller.io/253718200f2d",
  "https://embed.newsteller.io/3d66162d4c40",
  "https://embed.newsteller.io/e64bcb3f4c68",
];

const getIdFromEmbedViz = (url) => {
  return url.substring(url.lastIndexOf('/')+1)
}

const useStyles = makeStyles((theme) => ({
  ...sharedStyles(theme)
}));

export default function Examples() {
  const classes = useStyles();

  return (
    <Container>
      <HeroContainer
        title="Examples"
        subtitle="Media Laboratory generates visualizations that can be embedded everywhere with a single link."
        backgroundColor="#2618B1"
        backgroundElementsFill="%230b5fa4"
      />
      <Container className={classes.contentBox}>
        <Grid container spacing={4}>
          {links.map((link) => {
            const vid = getIdFromEmbedViz(link);

            return (
              <React.Fragment key={`viz-fragment-${vid}`}>
                <Grid key={`viz-grid-sx-${vid}`} item sm={12} md={6}>
                  <CopyBlock
                    key={`viz-code-${vid}`}
                    text={link}
                    language={"bash"}
                    showLineNumbers={false}
                    theme={solarizedLight}
                    codeBlock
                    customStyle={{borderRadius: '0.5rem'}}
                  />
                </Grid>
                <Grid key={`viz-grid-dx-${vid}`} item sm={12} md={6}>
                  <iframe key={`viz-iframe-${vid}`} title={getIdFromEmbedViz(link)} src={link} width="100%" height="500px" frameBorder="0"></iframe>
                </Grid>
              </React.Fragment>
          )})}
        </Grid>
      </Container>
    </Container>
  );
}
