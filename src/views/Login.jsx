import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/global/Footer";
import { auth } from "../back-end/Firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import EntryImages from "../constants/EntryImages";
import styles from "../styles/views/Login.module.css";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import greenLadyImg from "../img/green-lady.png";
import squiggle3Img from "../img/squiggle3.png";
import squiggle2Img from "../img/squiggle2.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      // Error has occurred signing in
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      // User is logged in, redirect to dashboard or show a message
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Failed to log in. Please try again");
    }
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["header"]}>
        <div className={styles["logo-container"]}>
          <Link to="/">
            <img
              className={styles["logo-img"]}
              src={EntryImages.logo}
              alt="logo"
            />
          </Link>
        </div>
      </div>

      <div className={styles["login-container"]}>
        <div className={styles["login-container-left"]}>
          <div className={styles["img-container"]}>
            <img
              className={styles["squiggle-img-3"]}
              src={squiggle3Img}
              alt="squiggle3"
            />
            <img
              className={styles["green-lady-img"]}
              src={greenLadyImg}
              alt="Green Lady"
            />
            <img
              className={styles["squiggle-img-2"]}
              src={squiggle2Img}
              alt="squiggle2"
            />
          </div>
        </div>
        <div className={styles["login-container-right"]}>
          <p className={styles["login-welcome-text"]}>hey there.</p>

          <p className={styles["login-prompt-text"]}>login or signup</p>

          <GoogleButton type="light" onClick={handleGoogleSignIn} />

          <p className={styles["login-link"]}>
            want more from zara? <a href="/pricing">see pricing</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
