import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="header-logo">Inkspire</Link>
        </div>

        <nav className="header-nav">
          <Link to="/story" className="header-link">Our Story</Link>
          <Link to="/write" className="header-link">Write</Link>
          <Link to="/signin" className="header-link">Sign In</Link>
          <Link to="/get-started">
            <button className="header-button">Get Started</button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
