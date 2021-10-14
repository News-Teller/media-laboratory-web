import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function getInitials(name) {
  return name ? name.charAt(0).toUpperCase() : '';
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#2618B1",
    color: "#FFF"
  },
  label: {
    marginLeft: 'auto',
    paddingLeft: 16,
  },
}));

export default function TopList({ data, onItemClick, avatar, getLabel }) {
  const classes = useStyles();

  return (
    <List>
      {data.map((bucket, index) => (
        <ListItem key={`toplist-item-${index}`} dense>
          {avatar && (
            <ListItemIcon>
              <Avatar className={classes.avatar}>{getInitials(bucket.key)}</Avatar>
            </ListItemIcon>
          )}
            <Link
              component="button"
              color="inherit"
              variant="body1"
              underline="none"
              onClick={() => {
                onItemClick(bucket.key)
              }}
            >
              {bucket.key}
            </Link>
            <Typography variant="body2" color="textSecondary" className={classes.label}>
            {getLabel(bucket)}
            </Typography>
        </ListItem>
      ))}
    </List>
  );
}

TopList.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      doc_count: PropTypes.number.isRequired,
    })),
    PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      article_count: PropTypes.number.isRequired,
    })),
  ]).isRequired,
  onItemClick: PropTypes.func,
  avatar: PropTypes.bool,
  getLabel: PropTypes.func.isRequired,
};

TopList.defaultProps = {
  onItemClick: (_) => { return },
  avatar: true,
}
