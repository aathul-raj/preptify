import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import HomeImages from "../constants/HomeImages.jsx";

import OrganizationImage from "../img/organization.png";

import "../styles/about.css";

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="about-main">
        <div className="header">
          <div className="logo-container">
            <img
              className="logo-img"
              src={HomeImages.logo}
              alt="logo"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="auth-buttons-container">
            <button
              onClick={() => navigate("/login")}
              className="log-in-button"
            >
              log in
            </button>
          </div>
        </div>
        <div className="about-container">
          <div className="about-content">
            <div className="about-text-container">
              <div className="slogan-container">
                <h1 className="about-slogan">
                  we’re building the future of career prep.{" "}
                  <span className="highlight">you in?</span>
                </h1>
              </div>
            </div>
            <img
              className="organization-img parallax-home"
              src={OrganizationImage}
              alt="Roman Statue"
              data-value=".4"
            />
          </div>
          <h2 className="about-mission-statement">
            We’re more than just a career prep platform - we’re a dynamic,
            diverse team on a mission to reinvent the landscape of career
            advancement. Our ethos is simple but profound: democratize career
            preparation, equipping people from all walks of life with the tools
            they need to propel their careers forward. At Preptify, we’re not
            just shaping careers , we’re shaping the future.
          </h2>
        </div>

        <div className="footer">
          <button> people </button>
          <button> faq </button>
          <button> contact </button>
        </div>
      </main>
    </>
  );
}

export default About;
