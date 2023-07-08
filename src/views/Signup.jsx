import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../back-end/firebase";
import { createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import EntryImages from "../constants/EntryImages";
import "../styles/signup.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  const db = getFirestore();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await setPersistence(auth, browserLocalPersistence);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credentials.user;
      await setDoc(doc(db, "users", user.uid), { tutorialShown: false, interviewsCompleted: 0 });
      // set user display name after creating user
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // User is signed up, redirect to dashboard or show a message
      navigate("/dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        console.log('Email address is already in use.');
        // You can also set an error message in your state to display this in your UI
        setErrorMessage('Email address is already in use. Do you already have an account?');
      } else if (errorCode === 'auth/weak-password') {
        console.log('The password is too weak.');
        // You can also set an error message in your state to display this in your UI
        setErrorMessage('The password is too weak. It should be at least 6 characters.');
      } else {
        setErrorMessage("Failed to sign up. Please try again");
        console.log(errorMessage);
      }
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
