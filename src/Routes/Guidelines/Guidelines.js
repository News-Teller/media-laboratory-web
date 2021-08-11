import React, { useState, useEffect } from 'react';
import { Grid, Container, TextField, LinearProgress} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import HeroContainer from '../../Components/HeroContainer'
import sharedStyles from '../../SharedStyles';
import MediaCard from '../../Components/MediaCard';
import './Guidelines.css';

const useStyles = makeStyles((theme) => ({
  ...sharedStyles(theme),
  textField: {
    marginBottom: theme.spacing(2),
  }
}));

const initialState = {
  data: null,
  error: false,
}

export default function GuideLines() {
  const classes = useStyles();

  const [state, setState] = useState(initialState)
  const [itemList, setItemList] = useState(state.data || []);

  const handleChange = () => (event) => {
    if (!state.data) return;
    const keyword = event.target.value.toLowerCase();
    setItemList(state.data.filter(content =>
      content.title.toLowerCase().search(keyword) > -1
    ));
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/guidelines.json');

      if (response.status === 200) {
        const body = await response.json();

        if (!body || !body.guidelines) return;

        setState({
          data: body.guidelines,
          error: false,
        });

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

    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <Container>
      <HeroContainer
        title="Guidelines"
        subtitle="TODO"
        backgroundColor="#e40045"
        backgroundElementsFill="%23fe5600"
      />
      <Container className={classes.contentBox}>
        <TextField
          label="Filter"
          variant="outlined"
          onChange={handleChange()}
          className={classes.textField}
        />
        {!state.data && !state.error && (<LinearProgress color="secondary" />)}
        {itemList && !state.error && (
        <Grid container spacing={4}>
          {itemList.map(item => (
            <Grid item key={item.id} sm={12} md={4}>
              <MediaCard id={`guideline-${item.id}`} title={item.title} text={item.body}/>
            </Grid>
          ))}
        </Grid>
        )}
        {!state.data && state.error && (<Alert severity="error">Oops, Something Went Wrong</Alert>)}
      </Container>
    </Container>
  );
}
