import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CodeBlock, dracula } from "react-code-blocks";
import { HeroContainer } from '../Components'

const code_1 = `git clone https://github.com/News-Teller/media-laboratory.git
cd media-laboratory
cp -r notebook YOUR_JUPYTER_FOLDER`;

const code_2 = `cd server
pip install -r requirements.txt
docker-compose up -d mongodb
python index.py`;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));


export default function Developers() {
  const classes = useStyles();

  return (
      <Container>
        <HeroContainer
          title="Developers"
          subtitle="This section will help you deploying the Media Laboratory environnement in the cloud"
          backgroundColor="#67e300"
          backgroundElementsFill="%2300a372"
        />

        <Container className={classes.container} maxWidth="md">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h3">Installation</Typography>
              <Typography>This section will help you deploying the Media Laboratory environnement in the cloud.</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h4" className={classes.number}>1</Typography>
              <Typography>Clone this repo and copy notebook folder inside your Jupyter working directory.</Typography>
            </Grid>
            <Grid item xs={6}>
              <CodeBlock
               text={code_1}
               language={"bash"}
               showLineNumbers={true}
               theme={dracula}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h4" gutterBottom className={classes.number}>2</Typography>
              <Typography>Run the server (development mode)</Typography>
            </Grid>
            <Grid item xs={6}>
              <CodeBlock
               text={code_2}
               language={"bash"}
               showLineNumbers={true}
               theme={dracula}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h4" gutterBottom className={classes.number}>3</Typography>
              <Typography>Run the example notebook example_notebook.ipynb</Typography>
            </Grid>
            <Grid item xs={6}>
              <img src={"https://jupyter.org/assets/labpreview.png"} alt="notebook environment preview" width="75%"/>
            </Grid>
          </Grid>
        </Container>
      </Container>
  );
}
