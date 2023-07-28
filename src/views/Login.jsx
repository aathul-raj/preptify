import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/global/Footer"
import { auth } from "../back-end/Firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import EntryImages from "../constants/EntryImages";
import styles from '../styles/Login.module.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

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
      console.error("Failed to log in", error);
    }
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['header']}>
        <div className={styles['logo-container']}>
          <Link to="/">
            <img className={styles['logo-img']} src={EntryImages.logo} alt="logo" />
          </Link>
        </div>
      </div>

      <div className={styles['login-container']}>
        <div className={styles['login-input-group']}>
          <div>
            <label>
              what is your <span className={styles['highlight']}>email?</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleLogin();
                }
              }}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <label>
              what is your <span className={styles['highlight']}>password?</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleLogin();
                }
              }}
              placeholder="12345678"
              required
            />
          </div>
        </div>
        {errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}

        <button className={styles['login-button']} onClick={handleLogin}>
          login
        </button>
        <p className={styles['login-link']}>
          dont have an account? <a href="/signup">sign up</a>
        </p>
        <p className={styles["login-link"]}>
          want more from zara? <a href="/pricing">see pricing</a>
        </p>
      </div>
      <Footer/>
    </div>
  )
}

export default Login;
