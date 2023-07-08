import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../back-end/firebase";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import EntryImages from "../constants/EntryImages";
import "../styles/login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user){
        navigate('/dashboard')
      }
    })
  }, [])

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
    <div className="main-container">
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img className="logo-img" src={EntryImages.logo} alt="logo" />
          </Link>
        </div>
      </div>

      <div className="login-container">
        <div className="login-input-group">
          <div>
            <label>
              what is your <span className="highlight">email?</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <label>
              what is your <span className="highlight">password?</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="12345678"
              required
            />
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button className="login-button" onClick={handleLogin}>
          login
        </button>
        <p className="login-link">
          dont have an account? <a href="/signup">sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
