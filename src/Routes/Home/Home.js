import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeroContainer from '../../Components/HeroContainer'
import sharedStyles from '../../SharedStyles';
import ajm from './Partners/ajm.png';
import epfl from './Partners/epfl.png';
import heidi from './Partners/heidi.png';
import imi from './Partners/imi.png';

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
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container>
      <HeroContainer
        title="Media Laboratory"
        subtitle="Media Laboratory is a initiative aiming to develop data-journalism in Switzerland"
        backgroundColor="#ffb400"
        backgroundElementsFill="%23ffe100"
      />
      <Container className={classes.contentBox} maxWidth="md">
        <Grid container spacing={3}>
          {partners.map(item => (
            <Grid item xs={2}>
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
