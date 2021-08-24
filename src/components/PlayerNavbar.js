import React, { Component } from "react";
import "./styles/PlayerNavbar.css";
import {Paper, Tabs, Tab} from '@material-ui/core'

class PlayerNavbar extends Component {
    
  render() {
    return (
      <div>
        <Paper id="navContainer">
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Stats" id="playerStatsTab"/>
            <Tab label="Graphs" id="playerGraphTab"/>
            <Tab label="Match History" id="playerMHTab"/>
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default PlayerNavbar;
