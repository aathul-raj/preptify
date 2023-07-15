import React, { useState } from "react";
import "../styles/pricing.css";
import Logo from "../img/preptify_cropped.png";
import { Link, useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="main-container">
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img className="logo-img" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="auth-buttons-container">
          <button onClick={() => navigate("/login")} className="log-in-button">
            log in
          </button>
        </div>
      </div>
      <div className="call-container">
        <div className="call-text">
          <h1>Invest in Yourself, Reap Rewards Forever</h1>
          <h2>
            Level up your interviews today with Zara - our AI-powered SWE
            interview assistant, designed to give you an edge.
          </h2>
        </div>
        <div className="price-switch-container">
          <div className="pricing-button-container">
            <button
              className={isAnnual ? "toggle-button" : "toggle-button active"}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={isAnnual ? "toggle-button active" : "toggle-button"}
              onClick={() => setIsAnnual(true)}
            >
              Annual
            </button>
          </div>
        </div>
        <div className="pricing-container">
          <div className="pricing-box basic-box">
            <h3 className="basic-highlight">Basic</h3>
            <p className="price-text">Free</p>
            <ul className="feature-list">
              <li>Limited daily interviews</li>
              <li>Standard analytics</li>
              <li>Interview performance insights</li>
              <li>Ads displayed on dashboard and during the interview</li>
              <li>Access to all industry-based questions</li>
            </ul>
            <button
              className="log-in-button"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </div>
          <div className="pricing-box premium-box">
            <h3 className="premium-highlight">Premium</h3>
            <p className="price-text">{isAnnual ? "$190/year" : "$17/month"}</p>
            <ul className="feature-list">
              <li>Unlimited access to interviews</li>
              <li>Ad-free interface for uninterrupted preparation</li>
              <li>
                Access to "Interview answer perfecter", "Resume-Based
                Interviewer", and "Next steps"
              </li>
              <li>Advanced Analytics</li>
            </ul>
            <a
              href="mailto:preptifyco@gmail.com?subject=Premium%20Interest&body=I'm%20interested%20in%20Preptify's%20premium%20plan!"
              target="_blank"
            >
              <button className="log-in-button">Coming Soon</button>
            </a>
          </div>
          {/* <div className="pricing-box enterprise-box">
            <h3 className="enterprise-highlight">Enterprise</h3>
            <p>{isAnnual ? "" : ""}</p>
            <button className="log-in-button">Contact Sales</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
