import React from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop,
  Box,
  CircularProgress,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const CustomPagination = withStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}))(Pagination);


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    '& li': {
      width: 'unset',
      paddingRight: theme.spacing(1),
      '&:not(:last-child):after': {
        content: '""',
        display: 'inline-block',
        width: '4px',
        height: '4px',
        marginLeft: theme.spacing(1),
        backgroundColor: theme.palette.text.secondary,
        borderRadius: '100%',
      },
    }
  },
  LaunchIcon: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
  }
}));


export default function QuoteResults({ data, page, totalPages, onPageChange, isLoading }) {
  const classes = useStyles();
  const backdropOpen = isLoading !== undefined ? isLoading : false;

  return (
    <Box className={classes.root}>
      <Backdrop className={classes.backdrop} open={backdropOpen} invisible>
        <CircularProgress color="primary" />
      </Backdrop>
      <List>
        {data.map((item, index) => (
            <ListItem key={`quoteItem-${index}`}>
              <Box className="MuiListItemText-root MuiListItemText-multiline">
                <Typography variant="body1" component="p" display="block">
                  {item.quote}
                </Typography>
                <List className={classes.flexContainer} dense disablePadding>
                  <ListItem disableGutters>
                    <Typography variant="body2" component="span" color="textSecondary">
                    {item.speaker}
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters>
                    <Typography variant="body2" component="span" color="textSecondary">
                      {item.classification}
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters>
                    <Link href={item.article_url} rel="noreferrer">
                      <LaunchIcon className={classes.LaunchIcon} />
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </ListItem>
        ))}
      </List>
      {totalPages > 1 && (
        <CustomPagination count={totalPages} page={page} onChange={(_, value) => onPageChange(value)} />
      )}
    </Box>
  )
}

QuoteResults.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    quote: PropTypes.string.isRequired,
    speaker: PropTypes.string.isRequired,
    classification: PropTypes.string.isRequired,
    article_url: PropTypes.string.isRequired,
  })).isRequired,
  isLoading: PropTypes.bool,
};

QuoteResults.defaultProps = {
  isLoading: false,
}
