import { NavLink } from "react-router-dom";
import "./index.css";

function SplashPage() {
  return (
    <div>
      <div className="splash-page-top">
        <div className="splash-page-text-container">
          <h1 className="splash-title">IMAGINE A PLACE...</h1>
          <div className="splash-text">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community.
          </div>
          <div className="splash-text">
            Where just you and a handful of friends can spend time together. A
            place that makes it easy
          </div>
          <div className="splash-text">
            to talk every day and hang out more often.
          </div>
          <NavLink to="/login">
            <button className="get-started-btn">
              Get Started With ChatCord!
            </button>
          </NavLink>
        </div>
      </div>

      <div className="splash-page-middle">
        <img
          className="splash-middle-img"
          src="https://i.imgur.com/CgqaHEE.jpg"
          alt="study-img"
        ></img>
        <div className="splash-middle-right">
          <h1 className="splash-middle-title">
            Create an invite-only place where you belong
          </h1>
          <div className="splash-middle-text">
            Discord servers are organized into topic-based channels where you
            can collaborate, share, and just talk about your day without
            clogging up a group chat.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
