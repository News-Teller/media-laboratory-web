import React from 'react';
import { Container, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HeroContainer } from '../Components'
import { copyToClipboard } from '../Utilities/Utilities.js';

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
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Examples() {
  const classes = useStyles();

  return (
    <Container>
      <HeroContainer
        title="Examples"
        subtitle="TODO"
        backgroundColor="#2618B1"
        backgroundElementsFill="%230b5fa4"
      />
      <Container className={classes.container}>
        <Grid container spacing={4}>
          {links.map((link) => (
            <>
            <Grid item key={getIdFromEmbedViz(link)} sm={12} md={6}>
              <TextField
                id="standard-read-only-input"
                label="Copy me"
                defaultValue={link}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                onClick={(event) => copyToClipboard(event.target.value)}
              />
            </Grid>
            <Grid item key={link} sm={12} md={6}>
              <iframe title={getIdFromEmbedViz(link)} src={link} width="100%" height="500px" frameborder="0"></iframe>
            </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}
