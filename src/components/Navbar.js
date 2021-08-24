import React, { Component } from "react";
import "./styles/Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <div id="header">
          <div className="headerLogo">
            <h2>WZReaders</h2>
          </div>
          <div className="headerSearch"></div>
          <div className="navbar">
            <a href="/">Thing1</a>
            <a href="/">Thing2</a>
            <a href="/">Thing3</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
