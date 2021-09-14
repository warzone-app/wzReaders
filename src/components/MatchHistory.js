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
    for (let i = 0; i < players.length; i++) {
      if (players[i].player.team === teamName) {
        team.push(players[i]);
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
        {this.props.userMatch.data.matches.map((el, i) => {
          return (
            <div className="singleMatchHistory" key={i}>
              <Link
                to={{
                  pathname: "/matchdetail",
                  state: el.matchID,
                }}
              >
                <div className="totalTeamStats">
                  <div className="teamPlacement">Placement:</div>
                  <div className="lobbyKdRatio">
                    Average KD:{" "}
                    {this.getKdRatio(
                      this.findMatchId(this.props.allPlayers, el.matchID)
                    )}
                  </div>
                  <div className="gameMode">
                    Mode: {this.gameMode(el.mode).toUpperCase()}
                  </div>
                </div>
                {this.getTeamMemberStats(
                  this.findMatchId(this.props.allPlayers, el.matchID),
                  el.player.team
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
