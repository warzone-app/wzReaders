import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllMatches } from "../store/landingPage";
import { Link } from "react-router-dom";
import "./styles/MatchHistory.css";

class MatchHistory extends Component {
  constructor() {
    super();
    this.getTeamPlacement = this.getTeamPlacement.bind(this);
    this.gameMode = this.gameMode.bind(this);
    this.getTeamMemberStats = this.getTeamMemberStats.bind(this);
    this.findMatchId = this.findMatchId.bind(this);
    this.getKdRatio = this.getKdRatio.bind(this);
  }

  getTeamPlacement(arr) {
    let placement = [];
    for (let i = 0; i < arr.length; i++) {
      placement.push(arr[i].playerStats.teamPlacement);
    }
    return placement;
  }

  gameMode(mode) {
    if (mode === "br_brquads") {
      return "br quads";
    } else if (mode === "br_brbbquad") {
      return "buy back quads";
    } else if (mode === "br_rebirth_rbrthquad") {
      return "rebirth quads";
    } else if (mode === "br_brtrios") {
      return "br trios";
    } else if (mode === "br_brbbtrios") {
      return "buy back trios";
    } else if (mode === "br_rebirth_rbrthtrio") {
      return "rebirth trios";
    } else if (mode === "br_brduos") {
      return "br duos";
    } else if (mode === "br_brbbduos") {
      return "buy back duos";
    } else if (mode === "br_brsolo") {
      return "br solos";
    } else if (mode === "br_brbbsolo") {
      return "buy back solos";
    } else if (mode === "br_dbd_dbd") {
      return "iron trials '84";
    } else {
      return mode;
    }
  }

  findMatchId(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].data.allPlayers[0].matchID === id) {
        return arr[i].data.allPlayers;
      }
    }
  }

  getKdRatio(playerKills) {
    let totalKills = 0;
    let avgKills = 0;
    for (let i = 0; i < playerKills.length; i++) {
      avgKills =
        (totalKills += playerKills[i].playerStats.kdRatio) /
        playerKills[i].playerCount;
    }
    return avgKills.toFixed(2);
  }

  getTeamMemberStats(players, teamName) {
    let team = [];
    let user = this.props.username.slice(0, this.props.username.indexOf("%"));
    for (let i = 0; i < players.length; i++) {
      if (players[i].player.team === teamName) {
        team.push(players[i]);
      }
    }
    if (team.length > 4) {
      return <div className="teamGreaterThanFour">Click match for details</div>;
    }
    let sortedTeam = team.sort(function (x, y) {
      return x.player.username.toLowerCase() === user.toLowerCase()
        ? -1
        : y.player.username.toLowerCase() === user.toLowerCase()
        ? 1
        : 0;
    });
    return (
      <div className="teamStats">
        <table>
          <thead>
            <tr className="teamStatsTableHeader">
              <td></td>
              <td className="tableStats">Kills</td>
              <td className="tableStats">Damage</td>
              <td className="tableStats">Deaths</td>
              <td className="tableStats">Gulag</td>
            </tr>
          </thead>
          {sortedTeam.map((el, i) => {
            if (el.playerStats.gulagKills === 1) {
              el.playerStats.gulagKills = "W";
            } else {
              el.playerStats.gulagKills = "L";
            }
            return (
              <tbody className="individualTeamMemberStats" key={i}>
                <tr className="teamStatsTableBody">
                  <td className="tableUsername">{el.player.username}</td>
                  <td className="tableStats">{el.playerStats.kills}</td>
                  <td className="tableStats">{el.playerStats.damageDone}</td>
                  <td className="tableStats">{el.playerStats.deaths}</td>
                  <td className="tableStats">{el.playerStats.gulagKills}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }

  render() {
    return (
      <div id="matchContainer">
        <div className="matchContainerTitle">Match History</div>
        {this.props.userMatch.data.matches.map((el, i) => {
          return (
            <Link
              className="singleMatchHistory"
              to={{
                pathname: "/matchdetail",
                state: el.matchID,
              }}
              key={i}
            >
              <div className="singleMatchHistoryContainer">
                <div id="singleMatchHeader">
                  <div className="singleMatchLobbyStatsContainer">
                    <div className="singleMatchPlacement">
                      <div
                        style={{
                          color:
                            el.playerStats.teamPlacement === 1
                              ? "#ffcc00"
                              : "#f9f9f9",
                        }}
                      >
                        {el.playerStats.teamPlacement}
                      </div>
                    </div>
                    <div className="singleMatchLobbyKd">
                      <div className="singleMatchHeaderTitle">Average KD</div>
                      <div>
                        {this.getKdRatio(
                          this.findMatchId(this.props.allPlayers, el.matchID)
                        )}
                      </div>
                    </div>
                    <div className="singleMatchLobbyMode">
                      <div className="singleMatchHeaderTitle">Mode</div>
                      <div>{this.gameMode(el.mode).toUpperCase()}</div>
                    </div>
                  </div>
                </div>
                {this.getTeamMemberStats(
                  this.findMatchId(this.props.allPlayers, el.matchID),
                  el.player.team
                )}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.landingPage.username,
    userMatch: state.landingPage.userMatch,
    matchId: state.landingPage.matchId,
    allPlayers: state.landingPage.allPlayers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllMatches: (matchId) => {
      dispatch(fetchAllMatches(matchId));
    },
  };
};

export default connect(mapState, mapDispatch)(MatchHistory);
