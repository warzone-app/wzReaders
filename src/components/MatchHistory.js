import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleMatch } from "../store/landingPage";
import "./styles/MatchHistory.css";

class MatchHistory extends Component {
  constructor() {
    super();
    this.getAvgKd = this.getAvgKd.bind(this);
  }
  getAvgKd(arr) {
    let totalKd = 0;
    let avgKd = 0;
    for (let i = 0; i < arr.length; i++) {
      // totalKd += arr[i].playerStats.kdRatio;
      totalKd += arr[i];
    }
    avgKd = totalKd / arr.length;
    return Math.round(avgKd).toFixed(2);
  }

  render() {
    let kdArr = [100, 100, 100, 100, 100];
    console.log("user match", this.props.userMatch);
    console.log("all matches", this.props.allMatchDetail);
    return (
      <div>
        {this.props.allMatchDetail.map((el, i) => {
          return (
            <div key={i}>
              <div className="playerKills">Kills: </div>
              <div>Average KD: {this.getAvgKd(kdArr)}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userMatch: state.landingPage.userMatch,
    matchId: state.landingPage.matchId,
    allMatchDetail: state.landingPage.allMatchDetail,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleMatch: (matchId) => {
      dispatch(fetchSingleMatch(matchId));
    },
  };
};

export default connect(mapState, mapDispatch)(MatchHistory);
