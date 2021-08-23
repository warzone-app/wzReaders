import React, { Component } from "react";

class Navbar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className="header">
          <div className="headerLogo">
            {/* <h1>Image</h1> */}
          </div>
          <div className="headerSearch"></div>
        </div>
        <div className="navbar">
          {/* <div>Thing1</div>
          <div>Thing2</div>
          <div>Thing3</div> */}
        </div>
      </div>
    );
  }
}

export default Navbar;
