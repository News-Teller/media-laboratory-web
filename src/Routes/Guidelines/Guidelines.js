import React, { useState, useEffect } from 'react';
import { Box, Grid, Container, LinearProgress, TextField, Typography, } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import sharedStyles from '../../SharedStyles';
import { HeroContainer, MediaCard, SplitView} from '../../Components';
import useScripts from '../../Hooks/useScripts';
import './Guidelines.css';

const useStyles = makeStyles((theme) => ({
  ...sharedStyles(theme),
  demoBox: {
    marginBottom: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(2.5),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

export default function GuideLines() {
  // Set a limit on selectable cards
  const selectionLimit = 5;

  const classes = useStyles();

  const [state, setState] = useState({
    data: null,
    error: false,
  });
  const [itemList, setItemList] = useState(state.data || []);
  const [selected, setSelected] = useState([]);

  const handleChange = () => (event) => {
    if (!state.data) return;
    const keyword = event.target.value.toLowerCase();
    setItemList(state.data.filter(content =>
      content.title.toLowerCase().search(keyword) > -1
    ));
  }

  const toggleSelection = (cardID) => {
    const id = cardID.slice(10);
    if (selected.includes(id)) {
      // Remove id from selection
      setSelected(prevState => prevState.filter(item => item !== id));
    } else if (selected.length < selectionLimit) {
      // Add id to selection
      setSelected(prevState => [...prevState, id]);
    }
  }

   // Fetch guideline cards data
  useEffect(() => {
    async function fetchData() {
      const { PUBLIC_URL } = process.env;
      const response = await fetch(`${PUBLIC_URL}/guidelines.json`);

      if (response.status === 200) {
        const body = await response.json();

        if (!body || !body.guidelines) return;

        // Set full guidelines data
        setState({
          data: body.guidelines,
          error: false,
        });

        // Set searched items
        setItemList(body.guidelines);
      } else {
        console.warn(response);
        setState({
          data: null,
          error: response.statusText || 'internal error',
        });
      }
    }
    fetchData();
  }, []);

  // Popovers elements needs to be recomputed each time a new card is selected
  // because trigger elements need to be re-parsed from the document
  useEffect(() => {
    const reloadPopoversjsElements = window['reloadPopoversjsElements'];
    if (reloadPopoversjsElements) {
      reloadPopoversjsElements();
    } else {
      console.warn('reloadPopoversjsElements is missing!');
    }
  }, [selected.length]);

  // Add popoversjs script and dependancies
  const popoversjsDeps = [
    'https://polyfill.io/v3/polyfill.min.js?features=fetch%2Ces2018%2CPromise%2CArray.prototype.find%2CObject.assign',
    'https://unpkg.com/@popperjs/core@2',
    `https://news-teller.github.io/media-laboratory-web/popovers.js`,
  ];
  useScripts(popoversjsDeps);

  return (
    <Container>
      <HeroContainer
        title="Guidelines"
        subtitle=" " // TODO
        backgroundColor="#e40045"
        backgroundElementsFill="%23fe5600"
      />
      <Container className={classes.contentBox}>

        {/* DEMO section */}
        <Box className={classes.demoBox}>
          <Typography variant="h4" className={classes.title}>Demo</Typography>
          <SplitView ids={selected} />
        </Box>

        {/* CARDS section */}
        <Typography variant="h4">Cards</Typography>
        <TextField
          label="Filter"
          variant="outlined"
          onChange={handleChange()}
          className={classes.textField}
        />
        {!state.data && !state.error && (<LinearProgress color="secondary" />)}
        {itemList && !state.error && (
        <Grid container spacing={4}>
          {itemList.map(item => {
            const isSelected = selected.includes(item.id);
            return (
            <Grid item key={item.id} sm={12} md={4}>
              <MediaCard
                id={`guideline-${item.id}`}
                title={item.title}
                text={item.body}
                isSelected={isSelected}
                onSelection={toggleSelection}
                isDisabled={!isSelected && (selected.length >= selectionLimit)}
              />
            </Grid>
          )})}
        </Grid>
        )}
        {!state.data && state.error && (<Alert severity="error">Oops, Something Went Wrong</Alert>)}
      </Container>
    </Container>
  );
}
