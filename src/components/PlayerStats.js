import React, { Component } from "react";
import NavbarSearch from "./NavbarSearch";
import StatSummary from "./StatSummary";
import Graph from "./Graph";
import PlayerNavbar from "./PlayerNavbar";
import MatchHistory from "./MatchHistory";
import {
  fetchData,
  fetchUserMatches,
  fetchSingleMatch,
} from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/PlayerStats.css";

class PlayerStats extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    await this.props.fetchData(this.props.username);
    await this.props.fetchUserMatches(this.props.username);
    setTimeout(
      async function () {
        await this.props.matchId.map((el) => this.props.fetchSingleMatch(el));
      }.bind(this),
      2000
    );
    // this.props.matchId.map((el) => this.props.fetchSingleMatch(el));
  }

  render() {
    if (
      Object.keys(this.props.userInfo).length === 0 ||
      Object.keys(this.props.userMatch).length === 0 ||
      Object.keys(this.props.allMatchDetail).length === 0
    ) {
      return <div>loading</div>;
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
    userMatch: state.landingPage.userMatch,
    allMatchDetail: state.landingPage.allMatchDetail,
    matchId: state.landingPage.matchId,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchData: (username) => {
      dispatch(fetchData(username));
    },
    fetchUserMatches: (username) => {
      dispatch(fetchUserMatches(username));
    },
    fetchSingleMatch: (matchId) => {
      dispatch(fetchSingleMatch(matchId));
    },
  };
};

export default connect(mapState, mapDispatch)(PlayerStats);
