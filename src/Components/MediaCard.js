import React from 'react';
import PropTypes from 'prop-types';
import clsx from  'clsx';
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@material-ui/core';
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
  collapsedContent: {
    paddingTop: 0,
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

export default function MediaCard({ id, term, definition, link, synonyms, tags, isSelected, onSelection, isDisabled }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(prevState => !prevState);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {id}
          </Avatar>
        }
        title={term}
        {...synonyms.length > 0 && {subheader: synonyms.join(', ')}}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {definition}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title={`${!isSelected ? 'Add' : 'Remove'} this card to the demo`}>
          <IconButton onClick={onSelection} aria-label="add to code" disabled={isDisabled}>
            {isSelected ? <RemoveCircle /> : <AddCircle />}
          </IconButton>
        </Tooltip>
        <Link
          href={link}
          variant="button"
          color="textPrimary"
          onClick={() => {
            console.info("I'm a button.");
          }}
        >
          Learn More
        </Link>
        {tags.length > 0 && (
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
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.collapsedContent}>
          <Typography variant="body2" color="textPrimary" component="span">Tags: </Typography>
          {tags.map(tag => (
            <Chip label={tag} variant="outlined" />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

MediaCard.propTypes = {
  id: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelection: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

MediaCard.defaultProps = {
  isSelected: false,
  isDisabled: false,
}
