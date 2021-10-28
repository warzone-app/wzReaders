import React, { Component } from "react";
import "./styles/AboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div className="aboutContainer">
        <div className="aboutTitle">About Us</div>
        <div className="aboutUsSummary">
          This is a Call of Duty fansite created to track player statistics. It
          is fully written, developed, and maintained by us, James and Randy.
        </div>
        <div className="aboutDevContainer">
          <div className="devContainer">
            <div className="devTitle">James Yon</div>
            <div className="devSummary">
              My name is James Yon. I’m a recent bootcamp graduate from
              Fullstack Academy. I have created many projects during bootcamp
              and WZReaders after graduation. I see myself as a problem-solver,
              and I’m always looking for a new challenge. I love building web
              applications with new technologies, frameworks and want to keep
              learning more. I strive to a web developer well versed in team
              collaboration to formulate and conceptualize corporate web
              presence.
            </div>
          </div>
          <div className="devContainer">
            <div className="devTitle">Randy Hyun</div>
            <div className="devSummary">
              I'm a full-stack software developer. I have previously studied
              Statistics but after immersing myself in an intensive training at
              Fullstack Academy for software development, I found that I really
              enjoyed it and grew a passion for it. Through this process I
              realized I enjoyed the challenges in problem solving and going
              through it with a team. I am eager to learning new technologies,
              ready to use the tools and experiences that Ive learned, and
              looking to apply my skills toward meaningful causes.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
