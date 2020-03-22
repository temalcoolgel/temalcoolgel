import "assets/scss/material-kit-react.scss?v=1.8.0";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import Components from "views/Components/Components";
import LandingPage from "views/LandingPage/LandingPage.js";
import MapPage from "views/MapPage/MapPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/components" component={Components} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/map" component={MapPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
