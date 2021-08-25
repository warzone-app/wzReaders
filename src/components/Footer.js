import React from "react";
import "./styles/Footer.css";

export default function Footer() {
  return (
    <div id="footerContainer">
      <div id="aboutContainer">
        <p className="footerText">James Yon</p>
        <div className="linkedin">
          <img
            alt=""
            src="https://cdn.iconscout.com/icon/free/png-256/linkedin-191-739516.png"
            className="linkedinimage"
          />
          <a
            href="https://www.linkedin.com/in/jamesjyon/"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            LinkedIn
          </a>
        </div>
        <div className="github">
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            className="githubimage"
          />
          <a
            href="https://github.com/jamesyon"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            Github
          </a>
        </div>
      </div>
      <div id="aboutContainer">
        <p className="footerText">Randy Hyun</p>
        <div className="linkedin">
          <img
            alt=""
            src="https://cdn.iconscout.com/icon/free/png-256/linkedin-191-739516.png"
            className="linkedinimage"
          />
          <a
            href="https://www.linkedin.com/in/randy-hyun/"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            LinkedIn
          </a>
        </div>
        <div className="github">
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            className="githubimage"
          />
          <a
            href="https://github.com/randy5478"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
