import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { LandingPage, PlayerStats } from "./components";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/playerstats" component={PlayerStats} />
      </Switch>
    );
  }
}

export default Routes;
