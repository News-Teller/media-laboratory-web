import React from 'react';
import PropTypes from 'prop-types';
import clsx from  'clsx';
import { Avatar, Card, CardActions, CardHeader, CardContent, Collapse, Typography, IconButton } from '@material-ui/core';
import { AddCircle, RemoveCircle, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MediaCard({ id, title, text, isSelected, onSelection, isDisabled }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(prevState => !prevState);
  };

  return (
    <Card id={id} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {title.charAt(0)}
          </Avatar>
        }
        title={title}
      />
      <CardActions disableSpacing>
        <IconButton onClick={() => onSelection(id)} aria-label="add to code" disabled={isDisabled}>
          {isSelected ? <RemoveCircle /> : <AddCircle />}
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

MediaCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelection: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

MediaCard.defaultProps = {
  isSelected: false,
  isDisabled: false,
}
