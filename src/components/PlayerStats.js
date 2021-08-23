import React, { Component } from "react";
import StatSummary from "./StatSummary";
import Graph from "./Graph";
import MatchHistory from "./MatchHistory";
import { fetchData } from "../store/landingPage";
import { connect } from "react-redux";

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
      <div id="PlayerStatsContainer">
        <div className="PlayerStatsNavbar">
          <h1>player stats navigation</h1>
        </div>
        <div className="StatSummaryContainer">
          <StatSummary />
        </div>
        <div className="GraphContainer">
          <Graph />
        </div>
        <div className="MatchHistoryContainer">
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
