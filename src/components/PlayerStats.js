import React, { Component } from "react";
import NavbarSearch from "./NavbarSearch";
import StatSummary from "./StatSummary";
import Graph from "./Graph";
import PlayerNavbar from "./PlayerNavbar";
import MatchHistory from "./MatchHistory";
import { fetchData, fetchMatchId } from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/PlayerStats.css";

class PlayerStats extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchData(this.props.username);
    this.props.fetchMatchId(this.props.username);
  }
  render() {
    if (Object.keys(this.props.userInfo).length === 0) {
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
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchData: (username) => {
      dispatch(fetchData(username));
    },
    fetchMatchId: (username) => {
      dispatch(fetchMatchId(username));
    },
  };
};

export default connect(mapState, mapDispatch)(PlayerStats);
