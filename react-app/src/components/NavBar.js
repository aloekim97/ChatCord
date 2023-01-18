import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        <li className="nav-bar-items">
          <NavLink to="/">
            <img
              className="nav-logo"
              src="https://i.imgur.com/r0H1LOu.jpg"
              alt="home-page-logo"
            ></img>
          </NavLink>
        </li>
        <li className="nav-bar-items">
          <NavLink
            className="about-us"
            to="/about"
            exact={true}
            activeClassName="active"
          >
            About Us
          </NavLink>
        </li>
        <div className="login-signup-nav">
          <NavLink
            to="/login"
            exact={true}
            activeClassName="active"
            className="nav-bar-btn splash-btn"
          >
            Log In
          </NavLink>
          <NavLink
            to="/sign-up"
            exact={true}
            activeClassName="active"
            className="nav-bar-btn splash-btn"
          >
            Sign Up
          </NavLink>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
