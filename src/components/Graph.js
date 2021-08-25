import React, { Component } from "react";
import "./styles/Graph.css";

class Graph extends Component {
  render() {
    return (
      <div id="playerGraphContainer">
        <div className="graphBox">
          <div className="graphTitle">Title</div>
        </div>
        <div className="graphBox">
          <div className="graphTitle">Title</div>
        </div>
        <div className="graphBox">
          <div className="graphTitle">Title</div>
        </div>
        <div className="graphBox">
          <div className="graphTitle">Title</div>
        </div>
      </div>
    );
  }
}

export default Graph;
