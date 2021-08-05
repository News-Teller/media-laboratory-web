import React, { useState, useEffect } from 'react';
import { Grid, Container, TextField, LinearProgress} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import HeroContainer from '../../Components/HeroContainer.js'
import MediaCard from './MediaCard.js';
import './Guidelines.css';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const initialState = {
  data: null,
  error: false,
}

export default function GuideLines() {
  const classes = useStyles();

  const [state, setState] = useState(initialState)
  const [itemList, setItemList] = useState(state.data || []);
  // const [state, setState] = useState("");

  const handleChange = () => (event) => {
    if (!state.data) return;
    const keyword = event.target.value.toLowerCase();
    setItemList(state.data.filter(content =>
      content.title.toLowerCase().indexOf(keyword) > -1
    ));
  }

  useEffect(() => {
    // Dynamic load guidelines data
    import('./Guidelines.json')
    .then(({guidelines}) => {
      if (guidelines) {
        setState({
          data: guidelines,
          error: false,
        });
        setItemList(guidelines);
      }
    })
    .catch(error => {
      console.warn(error);
      setState({
        data: null,
        error,
      });
    });

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
      <Container className={classes.container}>
        <TextField
         label="Filter"
         variant="outlined"
         onChange={handleChange()}
        />
        {!state.data && !state.error && (<LinearProgress color="secondary" />)}
        {state.data && !state.error && (
        <Grid container spacing={4}>
          {itemList.sort((a,b) => {return a.t > b.t}).map((content, index) => (
            <Grid item key={index} sm={12} md={4}>
              <MediaCard title={content.title} text={content.body}/>
            </Grid>
          ))}
        </Grid>
        )}
        {!state.data && state.error && (<Alert severity="error">Oops, Something Went Wrong</Alert>)}
      </Container>
    </Container>
  );
}
