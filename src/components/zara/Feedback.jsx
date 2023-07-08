import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Category from './Category'
import { doc, updateDoc, increment, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import CountUp from 'react-countup';
import ZaraImages from '../../constants/ZaraImages';
import "../../styles/Feedback.css";

export default function Feedback( {feedback} ){
    const db = getFirestore();
    const auth = getAuth();
    const currentUser = auth.currentUser;
    let positive = feedback.positive1
    let negativeOne = feedback.negative1
    let negativeTwo = feedback.negative2
    let behaviorScore = feedback.behavioral
    let problemScore = feedback.ps
    let commScore = feedback.communication
    let techScore = feedback.technical
    let score = (behaviorScore + problemScore + commScore + techScore) / 4
    let navigate = useNavigate();

    useEffect(() => {
        const userRef = doc(db, 'users', currentUser.uid);
        updateDoc(userRef, {
            interviewsCompleted: increment(1)
        });

        const handleMouseMove = (e) => {
          document.querySelectorAll(".parallax").forEach((move, index) => {
            var movingValue = move.getAttribute("data-value");
            var x = (e.clientX * movingValue) / 250;
            var y = (e.clientY * movingValue) / 250;
            var rotation;

            if (index === 0) {
                rotation = (((e.clientX + e.clientY) * movingValue) / 500) - 55; // Offset rotation for the first image
              } else {
                rotation = (((e.clientX + e.clientY) * movingValue) / 500) + 25;
            }
    
            move.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)`;
          });
        };
    
        document.addEventListener("mousemove", handleMouseMove);
    
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    
    function handleClick() {
        navigate(`/dashboard`);
    }
    
    return <div className="feedback-container">
        <img src={ZaraImages.confetti} className="parallax confetti-1" data-value=".5"/>
        <img src={ZaraImages.confetti} className="parallax confetti-2" data-value=".5"/>
        <h1 className="zara"><span className="green">Z</span>ARA</h1>
        <div className="top-text">
            <h2 className="completed">Interview <span className="green">Completed!</span></h2>
            <h3 className="score">Overall Score: <span className="green"><CountUp end={score} duration={5} decimals={1} decimal={'.'} delay={1}/>/10</span></h3>
        </div>
        <div className="feedback-content">
            <div className="category-container">
                <Category category="Behavioral Responses" score={behaviorScore}/>
                <Category category="Problem Solving" score={problemScore}/>
                <Category category="Comm. Skills" score={commScore}/>
                <Category category="Technical Skills" score={techScore}/>
            </div>
            <div className="comments-container">
                <ul>
                    <li className="negative-feedback">{negativeOne}</li>
                    <li className="negative-feedback">{negativeTwo}</li>
                    <li className="positive-feedback">{positive}</li>
                </ul>
            </div>
        </div>
        <h2 className="notice">All scores are out of 10</h2>
        <button onClick={handleClick}>Dashboard</button>
    </div>
}