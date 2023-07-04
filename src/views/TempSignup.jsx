import React, { useState } from "react";
import "../styles/signup.css";
import Logo from "../img/preptify_cropped.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

import { auth } from "../back-end/firebase";

function TempSignup() {
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

      // setErrorMessage("Failed to sign up. Please try again");
      // console.error("Failed to sign up", error);
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
