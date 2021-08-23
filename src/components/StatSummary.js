import React, { Component } from "react";

class StatSummary extends Component {
  render() {
    return (
      <div id="StatSummaryContainer">
        <div>
          <ul>
            <li>Win #</li>
            <li>Kills #</li>
            <li>K/D %</li>
            <li>Kills Per Game</li>
            <li>Matches Played #</li>
            <li> Top 5s #</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StatSummary;
