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
  setOldUsername,
} from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/PlayerStats.css";

class PlayerStats extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    // console.log(params.user.replace("#", "%23"))
    // console.log(params.platform)
    if (
      Object.keys(this.props.userInfo).length === 0 ||
      Object.keys(this.props.userMatch).length === 0 ||
      Object.keys(this.props.allPlayers).length < 20
    ) {
      await this.props.fetchData(
        params.user.replace("#", "%23"),
        params.platform
      );
      await this.props.fetchUserMatches(
        params.user.replace("#", "%23"),
        params.platform
      );

      setTimeout(
        async function () {
          await this.props.matchId.map((el) => this.props.fetchAllMatches(el));
        }.bind(this),
        4000
      );
    }
  }

  componentWillUnmount() {
    this.props.setOldUsername(this.props.username);
    console.log("UNMOUNTED", this.props.username);
  }

  render() {
    if (this.props.username !== this.props.oldUsername) {
      window.location.reload(false);
    }
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
    } else if (
      Object.keys(this.props.userInfo).length !== 0 &&
      Object.keys(this.props.userMatch).length !== 0 &&
      Object.keys(this.props.allPlayers).length === 20 &&
      this.props.username !== this.props.oldUsername
    ) {
      return <div></div>;
    } else {
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
}

const mapState = (state) => {
  return {
    userInfo: state.landingPage.userInfo,
    username: state.landingPage.username,
    oldUsername: state.landingPage.oldUsername,
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
    setOldUsername: (oUVal) => {
      dispatch(setOldUsername(oUVal));
    },
  };
};

export default connect(mapState, mapDispatch)(PlayerStats);
