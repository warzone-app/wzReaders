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
      <div className="teamContainer">
        <div className="teamStats">
          <div className="tablePlacement">
            {team[0].playerStats.teamPlacement}
          </div>
          {/* {team.map((el, i) => {
            let totalKills = 0;
            for (let i = 0; i < el.length; i++) {
              totalKills += el.playerStats.kills;
              return totalKills;
            }
            return <div className="tableTeamKills">{totalKills}</div>;
          })} */}
        </div>
        <table className="teamTableContainer">
          <thead>
            <tr className="tableHeader">
              <td></td>
              <td className="tableStats">Kills</td>
              <td className="tableStats">Damage</td>
              <td className="tableStats">Deaths</td>
              <td className="tableStats">Gulag</td>
            </tr>
          </thead>
          {team.map((el, i) => {
            if (el.playerStats.gulagKills === 1) {
              el.playerStats.gulagKills = "W";
            } else {
              el.playerStats.gulagKills = "L";
            }
            return (
              <tbody className="individualStats" key={i}>
                <tr className="tableBody">
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

  createTeam(num) {
    return (
      <div className="createdTeam">
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
      <div id="matchDetailBigContainer">
        <div id="matchDetailContainer">
          {this.getPlacements(
            this.getLobbyPlayers(
              this.props.location.state,
              this.props.allPlayers
            )
          ).map((el, i) => {
            return (
              <div id="listOfPlayers" key={i}>
                {this.createTeam(el)}
              </div>
            );
          })}
        </div>
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
