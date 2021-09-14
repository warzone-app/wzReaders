import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllMatches } from "../store/landingPage";
import "./styles/MatchDetail.css";

class MatchDetail extends Component {
  constructor() {
    super();
    this.getLobbyPlayers = this.getLobbyPlayers.bind(this);
    this.getTeamMemberStats = this.getTeamMemberStats.bind(this);
    this.createTeam = this.createTeam.bind(this);
    this.getPlacements = this.getPlacements.bind(this);
  }

  getLobbyPlayers(matchId, players) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].data.allPlayers[0].matchID === matchId) {
        return players[i].data.allPlayers;
      }
    }
  }

  getPlacements(placements) {
    let rank = [];
    for (let i = 0; i < placements.length; i++) {
      rank.push(placements[i].playerStats.teamPlacement);
    }
    let inOrderRank = rank.sort(function (a, b) {
      return a - b;
    });
    return Array.from(new Set(inOrderRank));
  }

  getTeamMemberStats(players, num) {
    let team = [];
    for (let i = 0; i < players.length; i++) {
      if (players[i].playerStats.teamPlacement === num) {
        team.push(players[i]);
      }
    }
    return (
      <div className="teamStats">
        <table>
          <tr>
            <td>Username</td>
            <td>Placement</td>
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
                <td>{el.playerStats.teamPlacement}</td>
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

  createTeam(num) {
    return (
      <div>
        {this.getTeamMemberStats(
          this.getLobbyPlayers(
            this.props.location.state,
            this.props.allPlayers
          ),
          num
        )}
      </div>
    );
  }

  render() {
    return (
      <div id="listOfPlayers">
        {this.getPlacements(
          this.getLobbyPlayers(this.props.location.state, this.props.allPlayers)
        ).map((el, i) => {
          return <div key={i}>{this.createTeam(el)}</div>;
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
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

export default connect(mapState, mapDispatch)(MatchDetail);
