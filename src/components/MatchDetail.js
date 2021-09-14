import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllMatches } from "../store/landingPage";
import "./styles/MatchDetail.css";

class MatchDetail extends Component {
  constructor() {
    super();
    this.getLobbyPlayers = this.getLobbyPlayers.bind(this);
    this.getTeamMemberStats = this.getTeamMemberStats.bind(this);
    this.getLastPlace = this.getLastPlace.bind(this);
    this.createTeam = this.createTeam.bind(this);
  }

  getLobbyPlayers(matchId, players) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].data.allPlayers[0].matchID === matchId) {
        return players[i].data.allPlayers;
      }
    }
  }

  getFirstPlace(placements) {
    let rank = [];
    for (let i = 0; i < placements.length; i++) {
      rank.push(placements[i].playerStats.teamPlacement);
    }
    return Math.max(...rank);
  }

  getLastPlace(placements) {
    let rank = [];
    for (let i = 0; i < placements.length; i++) {
      rank.push(placements[i].playerStats.teamPlacement);
    }
    return Math.max(...rank);
  }

  // getPlace(placements) {
  //   let rank = [];
  //   for (let i = 0; i < placements.length; i++) {
  //     for (let j = i + 1; j < placements.length; j++) {
  //       if (j > i) {
  //         rank.push(placements);
  //       }
  //       rank.push(placements[i].playerStats.teamPlacement);
  //     }
  //   }
  //   rank.push(placements[i].playerStats.teamPlacement);
  //   return Math.max(...rank);
  // }

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

  createTeam(num) {
    while (num) {
      if (
        num <
        this.getLastPlace(
          this.getLobbyPlayers(this.props.location.state, this.props.allPlayers)
        )
      ) {
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
      num++;
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
  }

  render() {
    return (
      <div id="listOfPlayers">
        <div>{this.createTeam(1)}</div>
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
