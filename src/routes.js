import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {
  LandingPage,
  PlayerStats,
  MatchDetail,
  UnderConstruction,
  AboutUs,
} from "./components";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/playerstats" component={PlayerStats} />
        <Route exact path="/matchdetail" component={MatchDetail} />
        <Route exact path="/underconstruction" component={UnderConstruction} />
        <Route exact path="/aboutus" component={AboutUs} />
      </Switch>
    );
  }
}

export default Routes;
