import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles/StatSummary.css";

class StatSummary extends Component {
  render() {
    const totalStats = this.props.userInfo.data.lifetime.mode.br.properties;
    return (
      <div id="statSummaryContainer">
        <div id="playerWins" className="playerBox">
          <div className="playerStatsTitleL">Wins</div>
          <div className="playerStatsNumberL">{totalStats.wins}</div>
          <img
              id="winsIcon"
              src="/images/wins.png"
              alt="wins icon"
            />
        </div>
        <div id="playerKills" className="playerBox">
          <div className="playerStatsTitleM">Kills</div>
          <div className="playerStatsNumberM">{totalStats.kills}</div>
          <img
              id="killsIcon"
              src="/images/kills.png"
              alt="kills icon"
            />
        </div>
        <div id="playerKD" className="playerBox">
          <div className="playerStatsTitleS">K/D</div>
          <div className="playerStatsNumberS">
            {totalStats.kdRatio.toString().slice(0, 4)}
          </div>
          <div id="KDIcon">K D</div>
        </div>
        <div id="playerKG" className="playerBoxG">
          <div className="playerStatsTitleS">Kills/Game</div>
          <div className="playerStatsNumberS">
            {(totalStats.kills / totalStats.gamesPlayed).toString().slice(0, 4)}
          </div>
          <img
              id="killsGameIcon"
              src="/images/killsGame2.png"
              alt="Kills Game icon"
            />
        </div>
        <div id="playerGames" className="playerBox">
          <div className="playerStatsTitleS">Games Played</div>
          <div className="playerStatsNumberS">{totalStats.gamesPlayed}</div>
          <img
              id="timeIcon"
              src="/images/time.png"
              alt="time icon"
            />
        </div>
        <div id="playerTop5" className="playerBox">
          <div className="playerStatsTitleS">Top 5</div>
          <div className="playerStatsNumberS">{totalStats.topFive}</div>
          <div id="FiveIcon">5</div>
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
