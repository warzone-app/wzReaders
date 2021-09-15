import React, { Component } from "react";
import { Link } from "react-router-dom";
import { setSearch, setPlatform } from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/LandingPage.css";

class LandingPage extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.platformPlaceholder = this.platformPlaceholder.bind(this);
  }

  handleChange(e) {
    this.props.setSearch(e.target.value.replace("#", "%23"));
  }

  handleClick(e) {
    console.log(123123, e.target.id)
    this.props.setPlatform(e.target.id)

  }

  platformPlaceholder(platform){
    if(platform === "battle"){
      return "Username#12345"
    } else {
      return "Username"
    }
  }

  render() {
    return (
      <div id="landingContainer">
        <div id="imageAndSearchContainer">
          <img
              id="WZLogo"
              src="/images/WZLogo3.png"
              alt="WZ Logo"
            />
          <div id="searchContainer">
            <div id="cover">
              <form id="landingForm">
                <div className="inputContainer">
                  <input
                    id="landingSearch"
                    type="text"
                    placeholder={this.platformPlaceholder(this.props.platform)}
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
            <div id="platformContainer">
              <button id="battle" onClick={this.handleClick}>Battle.net</button>
              <button id="psn" onClick={this.handleClick}>PlayStation</button>
              <button id="xbl" onClick={this.handleClick}>Xbox</button>
            </div>
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
    platform: state.landingPage.platform,
  };
};
const mapDispatch = (dispatch) => {
  return {
    setSearch: (sVal) => {
      dispatch(setSearch(sVal));
    },
    setPlatform: (pVal) => {
      dispatch(setPlatform(pVal));
    },
  };
};

export default connect(mapState, mapDispatch)(LandingPage);
