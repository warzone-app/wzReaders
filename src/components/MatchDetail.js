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
    this.getTotalKills = this.getTotalKills.bind(this);
    this.gameMode = this.gameMode.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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

  getTotalKills(team) {
    let totalKills = 0;
    for (let i = 0; i < team.length; i++) {
      totalKills += team[i].playerStats.kills;
    }
    return totalKills;
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
        <div className="teamStatsDetailContainer">
          <div className="teamMatchPlacement">
            <div
              style={{
                color:
                  team[0].playerStats.teamPlacement === 1
                    ? "#ffcc00"
                    : "#f9f9f9",
              }}
            >
              {team[0].playerStats.teamPlacement}
            </div>
          </div>
          <div className="teamMatchKills">
            <div>Team Kills</div>
            {this.getTotalKills(team)}
          </div>
        </div>
        <div className="teamStatsDetail">
          <table>
            <thead>
              <tr className="teamStatsTableHeaderDetail">
                <td></td>
                <td className="tableStatsDetail">Kills</td>
                <td className="tableStatsDetail">Damage</td>
                <td className="tableStatsDetail">Deaths</td>
                <td className="tableStatsDetail">Gulag</td>
              </tr>
            </thead>
            {team.map((el, i) => {
              if (el.playerStats.gulagKills === 1) {
                el.playerStats.gulagKills = "W";
              } else {
                el.playerStats.gulagKills = "L";
              }
              return (
                <tbody className="individualTeamMemberStatsDetail" key={i}>
                  <tr className="teamStatsTableBodyDetail">
                    <td className="tableUsernameDetail">
                      {el.player.username}
                    </td>
                    <td className="tableStatsDetail">{el.playerStats.kills}</td>
                    <td className="tableStatsDetail">
                      {el.playerStats.damageDone}
                    </td>
                    <td className="tableStatsDetail">
                      {el.playerStats.deaths}
                    </td>
                    <td className="tableStatsDetail">
                      {el.playerStats.gulagKills}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
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

  render() {
    let date = new Date(
      this.getLobbyPlayers(this.props.location.state, this.props.allPlayers)[0]
        .utcStartSeconds * 1000
    );
    return (
      <div id="matchDetailBigContainer">
        <div className="matchDetailMode">
          {this.gameMode(
            this.getLobbyPlayers(
              this.props.location.state,
              this.props.allPlayers
            )[0].mode
          ).toUpperCase()}
        </div>
        <div className="matchDetailDate">{date.toString().slice(0, 25)}</div>
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
