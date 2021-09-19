import React, { Component } from "react";
import "./styles/UnderConstruction.css";

class UnderConstruction extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <img alt="" src="/images/spotlightMedium.png" id="backgroundImage" />
        <div className="underConstructionText">
          <div className="under">Under</div>
          <div>Construction</div>
        </div>
      </div>
    );
  }
}

export default UnderConstruction;
