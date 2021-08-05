import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        This project is supported by {' '}
        <a href="https://www.media-initiative.ch/" rel="noreferrer">
          IMI
        </a>{' - '}
        {new Date().getFullYear()}
     </Typography>
    </footer>
  );
}
