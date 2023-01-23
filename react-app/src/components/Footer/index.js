import "./index.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <h1 className="footer-title">IMAGINE A PLACE</h1>
        <ul className="footer-columns">
          <label className="footer-labels">Hire Us</label>
          <NavLink to="/about" className="footer-text">
            About Us
          </NavLink>
        </ul>
        <ul className="footer-columns">
          <label className="footer-labels">Company</label>
          <li className="footer-text">App Academy</li>
          <li className="footer-text">Group 7</li>
          <li className="footer-text">Inspired by Discord</li>
        </ul>
        <ul className="footer-columns">
          <label className="footer-labels">Tech Stack</label>
          <li className="footer-text">Python</li>
          <li className="footer-text">React</li>
          <li className="footer-text">Flask</li>
          <li className="footer-text">Flask Alembic</li>
          <li className="footer-text">Flask SQL Alchemy</li>
          <li className="footer-text">Javascript</li>
          <li className="footer-text">HTML</li>
          <li className="footer-text">CSS</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
