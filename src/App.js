import { HashRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { AppBar, Container, Toolbar, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from  'clsx';
import { Page } from './Components'
import Developers from './Routes/Developers.js';
import Home from './Routes/Home/Home.js';
import Examples from './Routes/Examples.js';
import Guidelines from './Routes/Guidelines/Guidelines.js';
import NotFound from './Routes/NotFound.js';
import './App.css';

const useStyles = makeStyles(theme => ({
  navlink: {
    margin: '10px',
    color: '#afafaf',
    textDecoration: 'none',
  },
  current: {
    color: '#000 !important',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <AppBar position="static" color="transparent" elevation={0}>
          <Container maxWidth="md">
            <Toolbar>
              <Box display='flex' flexGrow={1}>
                <NavLink className={clsx(classes.navlink, classes.current)} to="/" exact={true} >
                  <Typography variant="h6" >
                    Media Laboratory
                  </Typography>
                </NavLink>
              </Box>
              <NavLink className={classes.navlink} to="/developers" activeClassName={classes.current}>
                  <Typography variant="h6" color="inherit">
                      Developers
                  </Typography>
              </NavLink>
              <NavLink className={classes.navlink} to="/examples" activeClassName={classes.current}>
                  <Typography variant="h6" color="inherit">
                      Examples
                  </Typography>
              </NavLink>
              <NavLink className={classes.navlink} to="/guidelines" activeClassName={classes.current}>
                  <Typography variant="h6" color="inherit">
                      Guidelines
                  </Typography>
              </NavLink>
            </Toolbar>
          </Container>
        </AppBar>

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Page component={Home} />
            )}
          />
          <Route
            path="/developers"
            render={() => (
              <Page title="Developers" component={Developers} />
            )}
          />
          <Route
            path="/examples"
            render={() => (
              <Page title="Examples" component={Examples} />
            )}
          />
          <Route
            path="/guidelines"
            render={() => (
              <Page title="Guidelines" component={Guidelines} />
            )}
          />
          <Route
            render={() => (
              <Page title="Page Not Found" component={NotFound} />
            )}
          />
        </Switch>
      </div>
    </Router>
    // </ThemeProvider>
  );
}

export default App;
