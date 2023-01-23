import "./index.css";
import React from "react";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <div className="about-us-background">
      <div className="about-us-top">
        <h1 className="about-us-title">About Us</h1>
      </div>
      <div className="about-us-container">
        <div className="about-card-container">
          <img
            src="https://media.licdn.com/dms/image/C5603AQGDyI-FgvFARQ/profile-displayphoto-shrink_800_800/0/1555221896845?e=1680134400&v=beta&t=Mt9HycXLxtGOD-EiL9UF1kMX9KedDsFGOPCoI0Drp64"
            alt="profile-pic"
            className="about-img"
          ></img>
          <div className="about-card-text">Remi Adekunle</div>
          <div className="about-links-container">
            <a href="https://github.com/Remiadekunle" target="_blank">
              <img
                className="about-card-links"
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="github-icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/remi-adekunle-28b989138/"
              target="_blank"
            >
              <img
                className="about-card-links"
                src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                alt="linkedin-icon"
              />
            </a>
          </div>
        </div>
        <div className="about-card-container">
          <img
            src="https://cdn.discordapp.com/attachments/1062151905742176367/1066976296233619546/IMG_3408.jpg"
            alt="profile-pic"
            className="about-img"
          ></img>
          <div className="about-card-text">Alex Kim</div>
          <div className="about-links-container">
            <a href="https://github.com/aloekim97" target="_blank">
              <img
                className="about-card-links"
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="github-icon"
              />
            </a>
            <a href="" target="_blank">
              <img
                className="about-card-links"
                src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                alt="linkedin-icon"
              />
            </a>
          </div>
        </div>
        <div className="about-card-container">
          <img
            src="https://avatars.githubusercontent.com/u/111800254?v=4"
            alt="profile-pic"
            className="about-img"
          ></img>
          <div className="about-card-text">Martin Yip</div>
          <div className="about-links-container">
            <a href="https://github.com/martinyip220" target="_blank">
              <img
                className="about-card-links"
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="github-icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/martin-yip-889a9b261/"
              target="_blank"
            >
              <img
                className="about-card-links"
                src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                alt="linkedin-icon"
              />
            </a>
          </div>
        </div>
      </div>
      <NavLink className="about-us-home" to="/">
        Return Home
      </NavLink>
    </div>
  );
}

export default About;
