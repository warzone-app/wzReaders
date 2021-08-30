import React, { Component } from "react";
import { Link } from "react-router-dom";
import { setSearch } from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/LandingPage.css";

class LandingPage extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.setSearch(e.target.value);
  }

  render() {
    return (
      <div id="landingContainer">
        <div id="searchContainer">
          <div id="platformContainer">
            <button>Battle.net</button>
            <button>PlayStation</button>
            <button>Xbox</button>
          </div>
          <div id="cover">
            <form id="landingForm">
              <div className="inputContainer">
                <input
                id="landingSearch"
                  type="text"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
                <Link to={"/playerstats"}>
                  <div className="td" id="buttonCover">
                    <button className="linkButton" type="submit">
                      <div id="buttonCircle"></div>
                      <span></span>
                    </button>
                  </div>
                </Link>
              </div>
            </form>
          </div>
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
    setSearch: (sVal) => {
      dispatch(setSearch(sVal));
    },
  };
};

export default connect(mapState, mapDispatch)(LandingPage);
