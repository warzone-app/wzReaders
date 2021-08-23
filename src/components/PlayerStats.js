import React, { Component } from "react";
import StatSummary from "./StatSummary";
import Graph from "./Graph";
import MatchHistory from "./MatchHistory";

class PlayerStats extends Component {
  render() {
    return (
      <div id="PlayerStatsContainer">
        <div className="PlayerStatsNavbar">
          <h1>player stats navigation</h1>
        </div>
        <div className="StatSummaryContainer">
          <StatSummary />
        </div>
        <div className="GraphContainer">
          <Graph />
        </div>
        <div className="MatchHistoryContainer">
          <MatchHistory />
        </div>
      </div>
    );
  }
}

export default PlayerStats;
