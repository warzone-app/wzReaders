import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles/MatchHistory.css";

class MatchHistory extends Component {
  render() {
    console.log(123, this.props.matchId.data.matches);
    return (
      <div id="matchContainer">
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
        <div className="singleMatch">
          <div className="matchDate">Match 123</div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    matchId: state.landingPage.matchId,
  };
};

export default connect(mapState, null)(MatchHistory);
