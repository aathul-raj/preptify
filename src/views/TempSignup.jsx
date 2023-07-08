import React from "react";
import { Link } from "react-router-dom";
import EntryImages from "../constants/EntryImages";
import "../styles/signup.css";

function TempSignup() {
  return (
    <div className="main-container">
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img className="logo-img" src={EntryImages.logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="signup-container">
        <div className="signup-text">
            <h1>We're currently in closed beta.</h1>
            <a href="https://forms.gle/gCwzHAWK6kZkJmPU8" target="_blank">Apply to be a beta tester by filling out this form.</a>
        </div>
        <p className="login-link">
          already have an account? <a href="/login">log in</a>
        </p>
      </div>
    </div>
  );
}

export default TempSignup;
