import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles/StatSummary.css";

class StatSummary extends Component {
  render() {
    const totalStats = this.props.userInfo.data.lifetime.mode.br.properties;
    console.log(typeof totalStats.kdRatio);
    return (
      <div id="statSummaryContainer">
        <div id="playerWins" className="playerBox">
            <div className="playerStatsTitleL">Wins</div>
            <div className="playerStatsNumberL">{totalStats.wins}</div>
        </div>
        <div id="playerKills" className="playerBox">
          <div className="playerStatsTitleM">Kills</div>
          <div className="playerStatsNumberM">{totalStats.kills}</div>
        </div>
        <div id="playerKD" className="playerBox">
          <div className="playerStatsTitleS">K/D</div>
          <div className="playerStatsNumberS">
            {totalStats.kdRatio.toString().slice(0, 4)}
          </div>
        </div>
        <div id="playerKG" className="playerBox">
          <div className="playerStatsTitleS">Kills/Game</div>
          <div className="playerStatsNumberS">
            {(totalStats.kills / totalStats.gamesPlayed).toString().slice(0, 4)}
          </div>
        </div>
        <div id="playerGames" className="playerBox">
          <div className="playerStatsTitleS">Games Played</div>
          <div className="playerStatsNumberS">{totalStats.gamesPlayed}</div>
        </div>
        <div id="playerTop5" className="playerBox">
          <div className="playerStatsTitleS">Top 5</div>
          <div className="playerStatsNumberS">{totalStats.topFive}</div>
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
