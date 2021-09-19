import React, { Component } from "react";
import "./styles/PlayerNavbar.css";
import { Paper, Tabs, Tab } from "@material-ui/core";

class PlayerNavbar extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div id="test111">
        <Paper id="navContainer">
          <Tabs value={false} indicatorColor="primary" textColor="primary">
            <Tab label="Overall Stats" id="playerStatsTab" href="#statSummary"/>
            <Tab label="Latest Stats" id="playerGraphTab" href="#graph"/>
            <Tab label="Match History" id="playerMHTab" href="#matchHistory"/>
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default PlayerNavbar;
