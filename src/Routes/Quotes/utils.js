export function isSearchContext(searchContext) {
  return searchContext === 'text';
}

export function buildSearchRequest(state) {
  const { searchTerm, topic, searchContext, current, resultsPerPage } = state;
  let filters;

  // set classification filter
  if (topic !== '*') {
    filters = [
      {
        field: 'classification',
        values: [topic],
        type: 'all',
      }
    ]
  }

  return {
    searchTerm,
    current,
    resultsPerPage,
    ...(filters && { filters }),
    context: isSearchContext(searchContext) ? 'article_text' : 'speaker',
  }
}

export function callSearchAPI(requestData) {
  const serverUrl = process.env.NODE_ENV === 'development' ?
    'http://localhost:3000' : 'https://newsteller.io';

  return fetch(`${serverUrl}/api/v1/quotes/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
  .then((response) => response.json())
  .then(body => {
    if (body.data) return body.data;
    else return null;
  })
  .catch(error => {
    console.warn(error)
  });
}

function buildTotalPages(resultsPerPage, totalResults) {
  if (!resultsPerPage) return 0;
  if (totalResults === 0) return 1;
  return Math.ceil(totalResults / resultsPerPage);
}

export function buildSearchState(data, resultsPerPage) {
  if (!data) return {};

  const { totalResults, hits, aggregations } = data;
  const totalPages = buildTotalPages(resultsPerPage, totalResults);

  return {
    quotes: hits,
    topSpeakers: aggregations && aggregations.speakers ? aggregations.speakers.buckets : [],
    topKeywords: aggregations && aggregations.keyphrases ? aggregations.keyphrases.buckets : [],
    totalPages: totalPages < 20 ? totalPages : 20
  };
}

export function getSearchTitle(searchTerm, searchContext, results) {
  let title;
  const prefix = isSearchContext(searchContext) ? 'Quotes for' : 'Quotes for speaker ';

  if (results) {
    title = searchTerm ? `${prefix} '${searchTerm}'` : '';
  } else {
    title = `No results for '${searchTerm}'`;
  }

  return title;
}
