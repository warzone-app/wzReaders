import React, { Component } from "react";
import NavbarSearch from "./NavbarSearch";
import StatSummary from "./StatSummary";
import Graph from "./Graph";
import LoadingScreen from "./LoadingScreen";
import PlayerNavbar from "./PlayerNavbar";
import MatchHistory from "./MatchHistory";
import {
  fetchData,
  fetchUserMatches,
  fetchAllMatches,
} from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/PlayerStats.css";

class PlayerStats extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    if (
      Object.keys(this.props.userInfo).length === 0 ||
      Object.keys(this.props.userMatch).length === 0 ||
      Object.keys(this.props.allPlayers).length < 20
    ) {
      await this.props.fetchData(this.props.username, this.props.platform);
      await this.props.fetchUserMatches(
        this.props.username,
        this.props.platform
      );
      setTimeout(
        async function () {
          await this.props.matchId.map((el) => this.props.fetchAllMatches(el));
        }.bind(this),
        4000
      );
    }
  }

  render() {
    if (
      Object.keys(this.props.userInfo).length === 0 ||
      Object.keys(this.props.userMatch).length === 0 ||
      Object.keys(this.props.allPlayers).length < 20
    ) {
      return (
        <div id="playerStatsContainer">
          <div>
            <NavbarSearch />
          </div>
          <div className="playerStatsNavbar">
            <PlayerNavbar />
          </div>
          <div>
            <LoadingScreen />
          </div>
        </div>
      );
    }
    return (
      <div id="playerStatsContainer">
        <div>
          <NavbarSearch />
        </div>
        <div className="playerStatsNavbar">
          <PlayerNavbar />
        </div>
        <div id="statSummary">
          <StatSummary />
        </div>
        <div id="graph">
          <Graph />
        </div>
        <div id="matchHistory">
          <MatchHistory />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userInfo: state.landingPage.userInfo,
    username: state.landingPage.username,
    platform: state.landingPage.platform,
    userMatch: state.landingPage.userMatch,
    allPlayers: state.landingPage.allPlayers,
    matchId: state.landingPage.matchId,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchData: (username, platform) => {
      dispatch(fetchData(username, platform));
    },
    fetchUserMatches: (username, platform) => {
      dispatch(fetchUserMatches(username, platform));
    },
    fetchAllMatches: (matchId) => {
      dispatch(fetchAllMatches(matchId));
    },
  };
};

export default connect(mapState, mapDispatch)(PlayerStats);
