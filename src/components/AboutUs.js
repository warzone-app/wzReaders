import React, { Component } from "react";
import "./styles/AboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div className="aboutContainer">
        <div className="aboutTitle">About Us</div>
        <div className="aboutDevContainer">
          <div className="devContainer">
            <h1>James Yon</h1>
            <div className="jamessummary">this is where my summary will go</div>
          </div>
          <div className="devContainer">
            <h1>Randy Hyun</h1>
            <div className="randysummary">
              this is where randy summary will go
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
