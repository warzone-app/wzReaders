import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllMatches } from "../store/landingPage";

class MatchDetail extends Component {
  constructor() {
    super();
    this.getTeamMemberStats = this.getTeamMemberStats.bind(this);
  }

  getTeamMemberStats(players) {
    let team = [];
    for (let i = 0; i < players.length; i++) {
      if (players[i].playerStats.teamPlacement === 1) {
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

  render() {
    return <div>This is the match detail page</div>;
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
