import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles/StatSummary.css";

class StatSummary extends Component {
  render() {
    const totalStats = this.props.userInfo.data.lifetime.mode.br.properties;
    return (
      <div id="statSummaryContainer">
        <div id="playerWins" className="playerLargeBox">
          <div>Wins</div>
          <div>{totalStats.wins}</div>
        </div>
        <div id="playerKills" className="playerMediumBox">
          <div>Kills</div>
          <div>{totalStats.kills}</div>
        </div>
        <div id="playerKD" className="playerSmallBox">
          <div>K/D</div>
          <div>{totalStats.kdRatio}</div>
        </div>
        <div id="playerKG" className="playerSmallBox">
          <div>Kills/Game</div>
          <div>{totalStats.kills / totalStats.gamesPlayed}</div>
        </div>
        <div id="playerGames" className="playerSmallBox">
          <div>Games Played</div>
          <div>{totalStats.gamesPlayed}</div>
        </div>
        <div id="playerTop5" className="playerSmallBox">
          <div>Top 5</div>
          <div>{totalStats.topFive}</div>
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
