import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles/StatSummary.css";

class StatSummary extends Component {
  render() {
    const totalStats = this.props.userInfo.data.lifetime.mode.br.properties;
    return (
      <div id="StatSummaryContainer">
        <div>
          <ul>
            <li>{totalStats.wins}</li>
            <li>{totalStats.kills}</li>
            <li>{totalStats.kdRatio}</li>
            <li>{totalStats.kills / totalStats.gamesPlayed}</li>
            <li>{totalStats.gamesPlayed}</li>
            <li> {totalStats.topFive}</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userInfo: state.landingPage.userInfo,
  };
};

export default connect(mapState, null)(StatSummary);
