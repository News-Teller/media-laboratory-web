import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CopyBlock, solarizedLight } from "react-code-blocks";
import { HeroContainer } from '../../Components'
import sharedStyles from '../../SharedStyles';
import Example from './Example';

// Codes
const deployment1 = `git clone https://github.com/News-Teller/media-laboratory.git`;
const deployment2 =`docker build -t medialab-notebook notebook
docker-compose build`;
const deployment3 = `docker-compose up -d`;

const useStyles = makeStyles((theme) => ({
  ...sharedStyles(theme),
}));

export default function Developers() {
  const classes = useStyles();

  const leftWidth = 4;
  const rightWidth = 8;

  return (
      <Container>
        <HeroContainer
          title="Developers"
          subtitle="This section will help you deploying the Media Laboratory environnement."
          backgroundColor="#67e300"
          backgroundElementsFill="%2300a372"
        />

        <Container className={classes.contentBox} maxWidth="md">
          <Grid container spacing={3} justifyContent="center">

            {/* DEPLOYMENT */}
            <Grid item xs={12}>
              <Typography variant="h3">Deployment</Typography>
              <Typography>
              Follow this steps to deploy the Media Laboratory environnement locally.
              For more information, visit the {' '}
              <a href="https://github.com/News-Teller/media-laboratory" rel="noreferrer">GitHub repository</a>.
              <br />
              These instructions require{' '}
              <a href="https://www.docker.com/" rel="noreferrer">Docker</a> {' '}
              and <a href="https://docs.docker.com/compose/install/" rel="noreferrer">Docker Compose</a> {' '}
              to be installed.
              </Typography>
            </Grid>

            <Grid item xs={leftWidth}>
              <Typography variant="h4" gutterBottom className={classes.number}>1</Typography>
              <Typography>Clone the GitHub repository</Typography>
            </Grid>
            <Grid item xs={rightWidth}>
              <CopyBlock
               text={deployment1}
               language={"bash"}
               showLineNumbers={false}
               theme={solarizedLight}
               codeBlock
              />
            </Grid>

            <Grid item xs={leftWidth}>
              <Typography variant="h4" gutterBottom className={classes.number}>2</Typography>
              <Typography>Build the custom docker images</Typography>
            </Grid>
            <Grid item xs={rightWidth}>
              <CopyBlock
               text={deployment2}
               language={"bash"}
               showLineNumbers={false}
               theme={solarizedLight}
               codeBlock
              />
            </Grid>

            <Grid item xs={leftWidth}>
              <Typography variant="h4" gutterBottom className={classes.number}>3</Typography>
              <Typography>Run the servicess</Typography>
            </Grid>
            <Grid item xs={rightWidth}>
              <CopyBlock
               text={deployment3}
               language={"bash"}
               showLineNumbers={false}
               theme={solarizedLight}
               codeBlock
              />
            </Grid>

            <Grid item xs={leftWidth+2}>
              <Typography variant="h4" gutterBottom className={classes.number}>4</Typography>
              <Typography>
                Access JupyterHub at <i>http://localhost:8000</i>{' '}
                and your visualizations at <i>http://localhost:8080/&lt;uid&gt;</i>

              </Typography>
            </Grid>
            <Grid item xs={rightWidth-2}>
              <img src={"https://jupyter.org/assets/labpreview.png"} alt="notebook environment preview" width="75%"/>
            </Grid>

            {/* Example */}
            <Example />

          </Grid>
        </Container>
      </Container>
  );
}
