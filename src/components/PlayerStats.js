import React, { Component } from "react";
import StatSummary from "./StatSummary";
import Graph from "./Graph";
import PlayerNavbar from "./PlayerNavbar"
import MatchHistory from "./MatchHistory";
import { fetchData } from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/PlayerStats.css";

class PlayerStats extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchData(this.props.username);
  }
  render() {
    if (Object.keys(this.props.userInfo).length === 0) {
      return <div>loading</div>;
    }
    return (
      <div id="playerStatsContainer">
        <div className="playerStatsNavbar">
          <PlayerNavbar/>
        </div>
        <div className="statSummaryContainer">
          <StatSummary />
        </div>
        <div className="graphContainer">
          <Graph />
        </div>
        <div className="matchHistoryContainer">
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
  };
};

export default connect(mapState, mapDispatch)(PlayerStats);
