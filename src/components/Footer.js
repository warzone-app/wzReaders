import React from "react";
import "./styles/Footer.css";

export default function Footer() {
  return (
    <div id="footerContainer">
      <div id="aboutContainer">
        <div className="footerText">James Yon</div>
        <div className="social">
          <a
            href="https://www.linkedin.com/in/jamesjyon/"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            <img
              alt=""
              src="https://cdn.iconscout.com/icon/free/png-256/linkedin-191-739516.png"
              className="linkedinImage"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/jamesjyon/"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            LinkedIn
          </a>
        </div>
        <div className="social">
          <a
            href="https://github.com/jamesyon"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              className="githubImage"
            />
          </a>
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
        <div className="footerText">Randy Hyun</div>
        <div className="social">
          <a
            href="https://www.linkedin.com/in/randy-hyun/"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            <img
              alt=""
              src="https://cdn.iconscout.com/icon/free/png-256/linkedin-191-739516.png"
              className="linkedinImage"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/randy-hyun/"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            LinkedIn
          </a>
        </div>
        <div className="social">
          <a
            href="https://github.com/randy5478"
            target="_blank"
            rel="noreferrer"
            className="linktext"
          >
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              className="githubImage"
            />
          </a>
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
