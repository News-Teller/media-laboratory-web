import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Container, Avatar, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HeroContainer } from '../../Components'
import sharedStyles from '../../SharedStyles';
import ajm from './Partners/ajm.png';
import epfl from './Partners/epfl.png';
import heidi from './Partners/heidi.png';
import imi from './Partners/imi.png';

import LibraryBooks from '@material-ui/icons/LibraryBooks';
import WebIcon from '@material-ui/icons/Web';
import TimerIcon from '@material-ui/icons/Timer';
import MessageIcon from '@material-ui/icons/Message';


const partners = [
  {
    name: 'epfl',
    img: epfl,
    url: 'https://www.epfl.ch',
  },
  {
    name: 'academie-du-journalisme-et-des-medias',
    img: ajm,
    url: 'https://unine.ch/ajm/',
  },
  {
    name: 'heidi.news',
    img: heidi,
    url: 'https://www.heidi.news',
  },
  {
    name: 'media-initiative',
    img: imi,
    url: 'https://www.media-initiative.ch/',
  }
];

const useStyles = makeStyles((theme) => ({
  ...sharedStyles(theme),
  logo: {
    width: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  txtbox: {
    marginTop: 60,
  },
  problemBox: {
    padding: 32,
    textAlign: 'center',
    fontSize: '20px',
    border: '1px solid lightgray',
    borderRadius: '20px',
  },
  probTitle: {
    marginBottom: theme.spacing(2),
  },
  probLink: {
    paddingTop: theme.spacing(2),
  },
  avatar: {
    backgroundColor: 'black',
    margin: '0 auto',
    marginBottom: '20px',
  },
  largeGutter: {
    marginTop: '1.0em !important',
    marginBottom: '1.0em !important',
  }
}));

export default function Home() {
  const classes = useStyles();

  return (

    <Container>
      <HeroContainer
        title="Media Laboratory"
        subtitle="Media Laboratory is a initiative aiming to develop data-journalism in Switzerland."
        backgroundColor="#ffb400"
        backgroundElementsFill="%23ffe100"
      />

      <Container className={classes.contentBox} maxWidth="md">
        <Typography variant="h4" className={classes.largeGutter} >
          Data meets journalism
        </Typography>
        <Typography variant="body1" gutterBottom>
          Data-journalism is an emergent practice that helps journalists conveying complex stories with data-visualizations.
          Data stories have been used for years by technologist and hobbyists, but many challenges remain for a wider media adoption.
          Our project is an inter-disciplinary collaboration between{' '}
          <Link href="https://www.epfl.ch" rel="noreferrer">EPFL</Link>,{' '}
          <Link href="https://unine.ch/ajm/" rel="noreferrer">AJM</Link> and {' '}
          <Link href="https://www.heidi.news/" rel="noreferrer">Heidi.news</Link>{' '}
          to identify those challenges and bootstrap open-source solutions for newsroom environments.
        </Typography>

        <Typography variant="h5" className={classes.largeGutter} >
          Features
        </Typography>
        <Typography variant="body1" gutterBottom>
          Our project aims to identify challenges faced by editorial teams, when creating data-supported content, as well as the difficulties encountered by public when exposed to these new article formats.

        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={6}>
          <div className={classes.problemBox}>
            <Avatar className={classes.avatar}>
              <WebIcon/>
            </Avatar>
            <div className={classes.probTitle}><b>Embeddable graphics</b></div>
            <div>Media Laboratory generates visualizations that can be embedded everywhere with a single link.</div>
            <div className={classes.probLink}>
              See <Link component={RouterLink} to="/examples">Examples</Link>
            </div>
          </div>
          </Grid>
          <Grid item xs={6}>
          <div className={classes.problemBox}>
            <Avatar className={classes.avatar}>
              <LibraryBooks/>
            </Avatar>
            <div className={classes.probTitle}><b>Didactic support</b></div>
            <div>We developed a didactic system, made of cards, that appears on top of technical terms in the figure and in the text.</div>
            <div className={classes.probLink}>
              See <Link component={RouterLink} to="/guidelines">Guidelines</Link>
            </div>
          </div>
          </Grid>
          <Grid item xs={6}>
          <div className={classes.problemBox}>
            <Avatar className={classes.avatar}>
              <TimerIcon/>
            </Avatar>
            <div className={classes.probTitle}><b>Continuous updates</b></div>
            <div>We developpe a system that periodically update the visualization, e.g. such as fetching data from a database every day. </div>
            <div className={classes.probLink}>
              See <Link href="https://github.com/News-Teller/media-laboratory" rel="noreferrer">Documentation</Link>
            </div>
          </div>
          </Grid>
          <Grid item xs={6}>
          <div className={classes.problemBox}>
            <Avatar className={classes.avatar}>
              <MessageIcon/>
            </Avatar>
            <div className={classes.probTitle}><b>Quote explorer</b></div>
            <div>Quotes are often uttered by domain experts. Our tool contuniously extracts quotes from articles and links them with specific topics.</div>
            <div className={classes.probLink}>
              See <Link component={RouterLink} to="/quotes">Quotes explorer</Link>
            </div>
          </div>
          </Grid>
        </Grid>

        <Container maxWidth="md" className={classes.txtbox}>
          <Typography variant="h5" className={classes.largeGutter} >
            Getting started
          </Typography>

          <Typography variant="body1" gutterBottom>
            We propose an open-source system that creates a production-ready environment for developing and deploying data-visualizations.
            Our system can easily be deployed with Docker and comes with a JupyterLab extension that manages your visualizations.
            Interested?
            Learn <Link component={RouterLink} to="/developers">how to deploy your own</Link>{' '}
            or check the project{' '}
            <Link href="https://github.com/News-Teller/media-laboratory" rel="noreferrer">on Github</Link>.
          </Typography>
        </Container>

        <Grid container spacing={3}>
          {partners.map(item => (
            <Grid key={`partner-${item.name}`} item xs={2}>
              <a href={item.url} rel="noreferrer">
                <img src={item.img} className={classes.logo} alt={item.name} />
              </a>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}
