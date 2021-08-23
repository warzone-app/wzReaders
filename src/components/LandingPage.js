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
            <button>XBOX Live</button>

          </div>
          <form id="formContainer">
            <input
              type="text"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <Link>
              <div>
                <button type="submit">
                  Search
                </button>
              </div>
            </Link>
          </form>

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
