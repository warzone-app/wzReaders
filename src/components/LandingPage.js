import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/LandingPage.css";

class LandingPage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchData("getlucky%2311560");
  }

  render() {
    console.log("this is the data", this.props.userInfo);
    return <div>STATS</div>;
  }
}

const mapState = (state) => {
  return {
    userInfo: state.landingPage.userInfo,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchData: (username) => {
      dispatch(fetchData(username));
    },
  };
};

export default connect(mapState, mapDispatch)(LandingPage);
