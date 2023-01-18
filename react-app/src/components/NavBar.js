import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
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
          <NavLink to="/about" exact={true} activeClassName="active">
            About Us
          </NavLink>
        </li>
        <li className="nav-bar-items">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li className="nav-bar-items">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-bar-items">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
