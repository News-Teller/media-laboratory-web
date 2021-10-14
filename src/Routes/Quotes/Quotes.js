import React, { useState, useEffect } from 'react';
import {
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HeroContainer, OutlinedBox, SearchBox, TopList } from '../../Components'
import sharedStyles from '../../SharedStyles';
import QuoteResults from './QuoteResults';
import {
  isSearchContext,
  buildSearchRequest,
  callSearchAPI,
  buildSearchState,
  getSearchTitle,
} from './utils';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    ...sharedStyles(theme).contentBox,
    minHeight: 600,
  },
  searchBox: {
    marginBottom: theme.spacing(2),
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.secondary,
    }
  },
  searchContext: {
    '& span': {
      marginRight: theme.spacing(1),
    }
  },
  aggregationBox: {
    '& .MuiGrid-item:not(:first-child)': {
      marginTop: theme.spacing(2),
    }
  }
}));

const topicsOptions = ['*', 'climat', 'politique', 'covid', 'autre'];
const contextOptions = ['text', 'speakers'];
const defaultFormValues = {
  searchTerm: '',
  topic: '*',
  searchContext: 'text',
  current: 1,
  resultsPerPage: 10,
};
const searchTitleDefault = 'Latest quotes';
const initialState = {
  searchTitle: '',
  quotes: [],
  topSpeakers: [],
  topKeywords: [],
  totalPages: 1
};

export default function Quotes() {
  const classes = useStyles();

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [state, setState] = useState(initialState);
  const [isLoading, setLoading] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value,
      current: 1,
    }));
  };

  const onSearch = async () => {
    const request = buildSearchRequest(formValues);

    // Open loading backdrop
    setLoading(true);

    const data = await callSearchAPI(request);

    if (!data) {
      // TODO: display error message
      return;
    } else {
      const results = buildSearchState(data, formValues.resultsPerPage);

      // Set search results
      setState(prevState => ({
        ...prevState,
        searchTitle: getSearchTitle(formValues.searchTerm, formValues.searchContext, results.quotes && results.quotes.length),
        ...results,
      }));
    }

    // Close loading backdrop
    setLoading(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSearch();
  };

  const handleAggregationsClick = async (value) => {
    setFormValues(prevState => ({
      ...prevState,
      searchTerm: value,
    }));

    await onSearch();
  };

  const handlePageChange = async (page) => {
    setFormValues(prevState => ({
      ...prevState,
      current: page
    }));

    await onSearch();
  };

  // Make first search on page load, only once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onSearch(), []);

  const searchPlaceholder = isSearchContext(formValues.searchContext) ?
    "Search on articles texts..." : "Search by speaker...";

  return (
    <Container>
      <HeroContainer
        title="Quotes"
        subtitle=" " // TODO
        backgroundColor="#2618B1"
        backgroundElementsFill="%230b5fa4"
      />
      <Container className={classes.contentBox}>

        {/* Search box */}
        <Grid container spacing={2}>

          <Grid item sm={12} md={12} className={classes.searchBox}>
            <Grid container spacing={2}>
              <Grid item md={8}>
                <form onSubmit={handleSubmit} role="search">
                  <SearchBox
                    placeholder={searchPlaceholder}
                    searchTerm={formValues.searchTerm}
                    handleChange={handleInputChange}
                    searchContext={isSearchContext(formValues.searchContext)}
                  />
                </form>
              </Grid>

              <Grid item md={4}>
              {/*  */}
                <OutlinedBox label="Filters">
                    <FormControl>
                      <Select
                        id="filter-class-select"
                        value={formValues.topic}
                        // onChange={handleClassChange}
                        onChange={handleInputChange}
                        inputProps={{
                          name: 'topic',
                          'aria-label': 'topic'
                        }}
                        disableUnderline
                      >
                        {topicsOptions.map((value, index) => (
                          <MenuItem key={`quote-class-select-${index}`} value={value}>
                            {(value !== '*' ) ? value : <em>All topics</em>}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={
                        <Select
                          id="filter-context-select"
                          value={formValues.searchContext}
                          onChange={handleInputChange}
                          inputProps={{
                            name: 'searchContext',
                            'aria-label': 'search-context'
                          }}
                          disableUnderline
                        >
                          {contextOptions.map((value, index) => (
                            <MenuItem key={`searc-context-select-${index}`} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                      label="Search on:"
                      labelPlacement="start"
                      className={classes.searchContext}
                    />
                </OutlinedBox>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        {/* Search results */}
        <Grid container spacing={2}>
          {/* Central, quote results */}
          <Grid item md={8}>
            <Typography variant="h4">
              {state.searchTitle || searchTitleDefault}
            </Typography>
            {state.quotes.length > 0 && (
              <QuoteResults
                data={state.quotes}
                page={formValues.current}
                totalPages={state.totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </Grid>

          {/* Left side, aggregations */}
          <Grid item md={4} className={classes.aggregationBox}>

            {isSearchContext(formValues.searchContext) && state.topSpeakers.length > 0 && (
              <Grid item>
                <Typography variant="h5">Top speakers</Typography>
                <TopList
                  data={state.topSpeakers}
                  onItemClick={handleAggregationsClick}
                  avatar={true}
                  getLabel={
                    (item) => { return item.doc_count < 10000 ? `${item.doc_count} quotes`: "More than 10k quotes" }
                  }
                />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h5">Top keywords</Typography>
                <TopList
                  data={state.topKeywords}
                  onItemClick={handleAggregationsClick}
                  avatar={false}
                  getLabel={
                    (item) => { return item.article_count < 10000 ? `${item.article_count} articles`: "More than 10k articles" }
                  }
                />
            </Grid>

          </Grid>
        </Grid>

      </Container>
    </Container>
  );
}
