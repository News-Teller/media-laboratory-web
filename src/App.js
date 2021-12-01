import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Page } from "./Components";
import Developers from "./Routes/Developers/Developers.js";
import Home from "./Routes/Home/Home.js";
import Examples from "./Routes/Examples.js";
import Guidelines from "./Routes/Guidelines/Guidelines.js";
import Quotes from "./Routes/Quotes/Quotes.js";
import NotFound from "./Routes/NotFound.js";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="">
        <div className="bg-gray-100">
          <div className="flex justify-between items-bottom container border-b-4 border-dotted border-primary py-5 ">
            <div className="p-3">
              <Link className="text-primary font-ttnorms text-3xl" to="/">
                Media Laboratory
              </Link>
            </div>
            <div className="flex">
              <Link
                to="/developers"
                className="self-end text-gray-500 text-xl p-3 font-ttnorms"
              >
                Developers
              </Link>
              <Link
                to="/examples"
                className="self-end text-gray-500 text-xl p-3"
              >
                Examples
              </Link>
              <Link
                to="/guidelines"
                className="self-end text-gray-500 text-xl p-3"
              >
                Guidelines
              </Link>
              <Link to="/quotes" className="self-end text-gray-500 text-xl p-3">
                Quotes explorer
              </Link>
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path="/" render={() => <Page component={Home} />} />
          <Route
            path="/developers"
            render={() => <Page title="Developers" component={Developers} />}
          />
          <Route
            path="/examples"
            render={() => <Page title="Examples" component={Examples} />}
          />
          <Route
            path="/guidelines"
            render={() => <Page title="Guidelines" component={Guidelines} />}
          />
          <Route
            path="/quotes"
            render={() => <Page title="Quotes explorer" component={Quotes} />}
          />
          <Route
            render={() => <Page title="Page Not Found" component={NotFound} />}
          />
        </Switch>
      </div>
    </Router>
    // </ThemeProvider>
  );
}

export default App;
