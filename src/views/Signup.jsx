import React, { useState } from "react";
import "../styles/signup.css";
import Logo from "../img/preptify_cropped.png";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../back-end/initFirebase";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const auth = getAuth();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User is signed up, redirect to dashboard or show a message
      navigate("/"); // for now redirect to home
    } catch (error) {
      setErrorMessage("Failed to sign up. Please try again");
      console.error("Failed to sign up", error);
    }
  };
  return (
    <div className="main-container">
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img className="logo-img" src={Logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="signup-container">
        <div className="input-group">
          <div>
            <label>
              what is your <span className="highlight">name?</span>
            </label>
            <div className="name-group">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="first name"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name"
                required
              />
            </div>
          </div>
          <div>
            <label>
              what is your <span className="highlight">email?</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.ccom"
              required
            />
          </div>
        </div>
        <div className="input-group">
          <div>
            <label>create password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="12345678"
              required
            />
          </div>
          <div>
            <label>confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="12345678"
              required
            />
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button className="signup-button" onClick={handleSignup}>
          sign up
        </button>
        <p className="login-link">
          already have an account? <a href="/login">log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
