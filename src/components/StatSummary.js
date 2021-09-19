import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles/StatSummary.css";

class StatSummary extends Component {
  constructor() {
    super();
    this.rankFunction = this.rankFunction.bind(this);
  }

  rankFunction(stats, type, typeG, typeP, mainId, titleCN, numCN, imgId, imgSrc, imgSrcG, imgSrcP, imgAlt){
    const rank = {
     "winsG": 20,
      "winsP": 100,
      "killsG": 1100,
      "killsP": 7600,
     "kdG": 1.15,
      "kdP": 2.00,
      "kgG": 2.70,
      "kgP": 5.00
    }
    const gold = rank[typeG]
    const plat = rank[typeP]
    if(!imgAlt && stats < gold){
      return(
      <div id={mainId} className="playerBox">
          <div className={titleCN}>{type}</div>
          <div className={numCN}>{stats}</div>
          <div id={imgSrc}>{imgId}</div>
        </div>
      )
    }else if(!imgAlt && stats >= gold && stats < plat){
      return(
        <div id={mainId} className="playerBoxG">
            <div className={titleCN}>{type}</div>
            <div className={numCN}>{stats}</div>
            <div id={imgSrcG}>{imgId}</div>
          </div>
        )
    }else if(!imgAlt && stats > plat){
      return(
        <div id={mainId} className="playerBoxP">
            <div className={titleCN}>{type}</div>
            <div className={numCN}>{stats}</div>
            <div id={imgSrcP}>{imgId}</div>
          </div>
        )
    }else if(stats < gold ){
      return(
        <div id={mainId} className="playerBox">
          <div className={titleCN}>{type}</div>
          <div className={numCN}>{stats}</div>
          <img
              id={imgId}
              src={imgSrc}
              alt={imgAlt}
            />
        </div>
      ) 
    }else if(stats >= gold && stats < plat){
      return(
        <div id={mainId} className="playerBoxG">
          <div className={titleCN}>{type}</div>
          <div className={numCN}>{stats}</div>
          <img
              id={imgId}
              src={imgSrcG}
              alt={imgAlt}
            />
        </div>
      )
    }else {
      return(
        <div id={mainId} className="playerBoxP">
          <div className={titleCN}>{type}</div>
          <div className={numCN}>{stats}</div>
          <img
              id={imgId}
              src={imgSrcP}
              alt={imgAlt}
            />
        </div>
      )
    }
  }

  render() {
    const totalStats = this.props.userInfo.data.lifetime.mode.br.properties;
    return (
      <div id="wholeStatSummaryContainer">
        <div id="statsUserName">{this.props.userInfo.data.username}</div>
        <div id="statSummaryContainer">
          {this.rankFunction(totalStats.wins, "Wins", "winsG", "winsP", "playerWins", "playerStatsTitleL", "playerStatsNumberL", "winsIcon", "/images/wins.png", "/images/winsG.png", "/images/winsP.png", "wins icon")}
          {this.rankFunction(totalStats.kills, "Kills", "killsG", "killsP", "playerKills", "playerStatsTitleM", "playerStatsNumberM", "killsIcon", "/images/kills.png", "/images/killsG.png", "/images/killsP.png", "kills icon")}
          {this.rankFunction(totalStats.kdRatio.toString().slice(0, 4), "K/D", "kdG", "kdP", "playerKD", "playerStatsTitleS", "playerStatsNumberS", "K D", "KDIcon", "KDIconG", "KDIconP")}
          {this.rankFunction((totalStats.kills / totalStats.gamesPlayed).toString().slice(0, 4), "Kills/Game", "kgG", "kgP", "playerKG", "playerStatsTitleS", "playerStatsNumberS", "killsGameIcon", "/images/killsGame.png", "/images/killsGameG.png", "/images/killsGameP.png", "Kills Game icon")}
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
