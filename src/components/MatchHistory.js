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
    } else {
      return mode;
    }
  }

  getTeamMemberStats(user, players) {
    let team = [];
    for (let i = 0; i < user.length; i++) {
      for (let j = 0; j < players.length; j++) {
        if (
          players[j].player.team === user[i].player.team &&
          players[j].matchID === user[i].matchID
        ) {
          team.push(players[j]);
        }
      }
    }
    if (team.length > 4) {
      return "Click for match detail";
    }
    return (
      <div className="teamStats">
        <table>
          <tr>
            <td>Username</td>
            <td>Kills</td>
            <td>Damage</td>
            <td>Deaths</td>
            <td>Gulag</td>
          </tr>
          {team.map((el, i) => {
            if (el.playerStats.gulagKills === 1) {
              el.playerStats.gulagKills = "W";
            } else {
              el.playerStats.gulagKills = "L";
            }
            return (
              <tr className="individualStats" key={i}>
                <td>{el.player.username}</td>
                <td>{el.playerStats.kills}</td>
                <td>{el.playerStats.damageDone}</td>
                <td>{el.playerStats.deaths}</td>
                <td>{el.playerStats.gulagKills}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }

  render() {
    return (
      <div id="matchContainer">
        {this.props.allPlayers.map((el, i) => {
          let lobbyKd = 0;
          let avgLobbyKd = 0;
          function kdRatio(array) {
            for (let i = 0; i < array.length; i++) {
              lobbyKd += array[i].playerStats.kdRatio;
            }
            avgLobbyKd = lobbyKd / array[i].playerCount;
            return avgLobbyKd.toFixed(2);
          }
          return (
            <div className="singleMatchHistory" key={i}>
              <Link to="/matchdetail">
                <div className="totalTeamStats">
                  <div className="teamPlacement">
                    Placement:
                    {
                      this.getTeamPlacement(this.props.userMatch.data.matches)[
                        i
                      ]
                    }
                  </div>
                  <div className="lobbyKdRatio">
                    Average KD: {kdRatio(el.data.allPlayers)}
                  </div>
                  <div className="gameMode">
                    Mode:{" "}
                    {this.gameMode(el.data.allPlayers[0].mode).toUpperCase()}
                  </div>
                </div>
                {this.getTeamMemberStats(
                  this.props.userMatch.data.matches,
                  el.data.allPlayers
                )}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
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
