import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/dashboard.css";
import Logo from "../img/preptify_cropped.png";
import DashboardImg from "../img/dashboard.png";
import ActivityImg from "../img/activity.png";
import SettingsImg from "../img/settings.png";
import PriceTagImg from "../img/price-tag.png";

function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState(""); // <-- add this state for user's name
  const auth = getAuth();
  const [timePeriod, setTimePeriod] = useState("1-day");

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user ? user.email : "");
      setUserName(user ? user.displayName : ""); // <-- update user's name here
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img src={Logo} alt="Logo" />
        <ul>
          <li>
            <img className="sidebar-icon" src={DashboardImg}></img>dashboard
          </li>
          <li>
            <img className="sidebar-icon" src={ActivityImg}></img>activity
          </li>
          <li>
            <img className="sidebar-icon" src={PriceTagImg}></img>pricing
          </li>
          <li>
            <img className="sidebar-icon" src={SettingsImg}></img>settings
          </li>
        </ul>
        <div className="user-info">
          <p>{userEmail}</p>
          <button className="sign-out-button">sign out</button>
        </div>
      </div>
      <div className="content-container">
        <div className="pill-container">
          <h1 className="welcome-text">
            welcome, <span className="highlight">{userName}!</span>
          </h1>

          <div className="time-pill">
            <select value={timePeriod} onChange={handleTimePeriodChange}>
              <option value="1-day">1 Day</option>
              <option value="1-week">1 Week</option>
              <option value="1-month">1 Month</option>
              <option value="1-year">1 Year</option>
              <option value="lifetime">Lifetime</option>
            </select>
          </div>
        </div>
        <div className="box-row">
          <div className="box">
            <p className="stats-text">stuff for starting new interview</p>
          </div>
          <div className="box">
            <p className="stats-text">progress graph n stuff</p>
          </div>
        </div>
        <div className="box-row">
          <div className="box">
            <p className="big-number">12</p>
            <p className="stats-text">interviews completed</p>
          </div>
          <div className="box">
            <p className="big-number">47</p>
            <p className="stats-text">average minutes</p>
          </div>
          <div className="box">
            <p className="big-number">9.3</p>
            <p className="stats-text">overall score</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <button> people </button>
        <button> faq </button>
        <button> contact </button>
      </div>
    </div>
  );
}

export default Dashboard;
