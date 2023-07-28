import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/global/Footer"
import EntryImages from "../constants/EntryImages";
import styles from "../styles/Signup.module.css"

function TempSignup() {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["header"]}>
        <div className={styles["logo-container"]}>
          <Link to="/">
            <img className={styles["logo-img"]} src={EntryImages.logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className={styles["signup-container"]}>
        <div className={styles["signup-text"]}>
            <h1>We're currently in closed beta.</h1>
            <a href="https://forms.gle/gCwzHAWK6kZkJmPU8" target="_blank">Apply to be a beta tester by filling out this form.</a>
        </div>
        <p className={styles["login-link"]}>
          already have an account? <a href="/login">log in</a>
        </p>
        <p className={styles["login-link"]}>
          want more from zara? <a href="/pricing">see pricing</a>
        </p>
      </div>
      <Footer/>
    </div>
  );
}

export default TempSignup;
