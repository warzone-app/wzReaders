import React, { Component } from "react";
import "./styles/AboutUs.css";
import james from "./photo/jamesyon.png";
import randy from "./photo/randyhyun.png";

class AboutUs extends Component {
  render() {
    return (
      <div className="aboutContainer">
        <div className="aboutTitle">About Us</div>
        <div className="aboutUsSummary">
          This is a Call of Duty fansite created to track player statistics.
          WZReaders is fully written, developed, and maintained by us.
        </div>
        <div className="aboutDevContainer">
          <div className="devContainer">
            <img className="photo" alt="james" src={james} />
            <div className="devName">James Yon</div>
            <div className="devSummaryJames">
              I am a recent bootcamp graduate from Fullstack Academy. WZReaders
              is the most recent project I worked on. I see myself as a
              problem-solver, and I’m always looking for a new challenge. I love
              building web applications with new technologies, frameworks, and
              strive to be a web developer well versed in team collaboration. I
              want to be able to formulate and conceptualize a professional web
              presence within the tech industry.
            </div>
          </div>
          <div className="devContainer">
            <img className="photo" alt="randy" src={randy} />
            <div className="devName">Randy Hyun</div>
            <div className="devSummaryRandy">
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
