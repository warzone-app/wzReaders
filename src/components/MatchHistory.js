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
    let user = this.props.username.slice(0, this.props.username.indexOf("%"));
    for (let i = 0; i < players.length; i++) {
      if (players[i].player.team === teamName) {
        team.push(players[i]);
      }
    }
    if (team.length > 4) {
      return <div className="matchDetail">Click for match details</div>;
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
            <tr className="tableHeader">
              <td></td>
              <td>Kills</td>
              <td>Damage</td>
              <td>Deaths</td>
              <td>Gulag</td>
            </tr>
          </thead>
          {sortedTeam.map((el, i) => {
            if (el.playerStats.gulagKills === 1) {
              el.playerStats.gulagKills = "W";
            } else {
              el.playerStats.gulagKills = "L";
            }
            return (
              <tbody className="individualStats" key={i}>
                <tr className="tableBody">
                  <td>{el.player.username}</td>
                  <td>{el.playerStats.kills}</td>
                  <td>{el.playerStats.damageDone}</td>
                  <td>{el.playerStats.deaths}</td>
                  <td>{el.playerStats.gulagKills}</td>
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
        {this.props.userMatch.data.matches.map((el, i) => {
          return (
            <div className="singleMatchHistory" key={i}>
              <div id="totalTeamStats">
                <div className="teamPlacement">
                  <div className="teamText">{el.playerStats.teamPlacement}</div>
                </div>
                <div className="lobbyStats">
                  <div className="teamLobbyStats">
                    <div className="teamLobbyTitle">Average KD</div>
                    <div>
                      {this.getKdRatio(
                        this.findMatchId(this.props.allPlayers, el.matchID)
                      )}
                    </div>
                  </div>
                  <div className="teamLobbyStats">
                    <div className="teamLobbyTitle">Mode</div>
                    <div>{this.gameMode(el.mode).toUpperCase()}</div>
                  </div>
                </div>
              </div>
              <Link
                to={{
                  pathname: "/matchdetail",
                  state: el.matchID,
                }}
              >
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
