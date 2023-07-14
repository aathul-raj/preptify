import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Category from './Category'
import { doc, updateDoc, getDoc, increment, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import CountUp from 'react-countup';
import ZaraImages from '../../constants/ZaraImages';
import "../../styles/Feedback.css";

export default function Feedback( {feedback, responseTimes} ){
    const db = getFirestore()
    const auth = getAuth()
    const currentUser = auth.currentUser
    let positive = feedback.positive1
    let negativeOne = feedback.negative1
    let negativeTwo = feedback.negative2
    let behaviorScore = feedback.behavioral
    let problemScore = feedback.ps
    let commScore = feedback.communication
    let techScore = feedback.technical
    let score = (behaviorScore + problemScore + commScore + techScore) / 4
    let navigate = useNavigate()
    const responseTimeSum = responseTimes.reduce((a, b) => a + b, 0);
    const questionCount = responseTimes.length
    
    useEffect(() => {
        const userRef = doc(db, 'users', currentUser.uid);
        updateDoc(userRef, {
            interviewsCompleted: increment(1),
            recentFeedback: {...feedback, "overallScore": score, "responseTime" : responseTimeSum}
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
        navigate(`/dashboard`, { replace: true })
        updateFeedbackSummary({...feedback, "overallScore": score, "responseTime" : responseTimeSum})
    }

    async function updateFeedbackSummary(recentFeedback){
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        let userData = userDoc.data();
        let newFeedbackSummary = {}
        if (!userData.feedbackSummary) {
            newFeedbackSummary = {
                ps: { total: 0, count: 0 },
                technical: { total: 0, count: 0 },
                communication: { total: 0, count: 0 },
                behavioral: { total: 0, count: 0 },
                overallScore: { total: 0, count: 0 },
                responseTime: { total: 0, count: 0},
                negative1: "",
                negative2: "",
                positive1: "",
              }
        } else {
            newFeedbackSummary = {...userData.feedbackSummary}
        }
        
        console.log(newFeedbackSummary)
        for (let key in recentFeedback) {
            if (key == "responseTime") {
                newFeedbackSummary[key] = {
                    ...newFeedbackSummary[key],
                    total: responseTimeSum + newFeedbackSummary[key].total,
                    count: questionCount + newFeedbackSummary[key].count
                }
            }
            else if (typeof recentFeedback[key] === "number") {
                newFeedbackSummary[key] = {
                    ...newFeedbackSummary[key],
                    total: recentFeedback[key] + newFeedbackSummary[key].total,
                    count: (newFeedbackSummary[key]?.count || 0) + 1
                }
            } else if (typeof recentFeedback[key] === "string") {
              newFeedbackSummary[key] = recentFeedback[key]
            }
        }

        let historicalScores = userData.historicalScores || []
        historicalScores.push(score);

        let historicalResponseTime = userData.historicalResponseTime || []
        historicalResponseTime = [...historicalResponseTime, ...responseTimes]

        if (historicalScores.length > 10) {
            historicalScores.shift()
            historicalResponseTime.shift()
        }

        updateDoc(userRef, {
            feedbackSummary: newFeedbackSummary,
            historicalScores: historicalScores,
            historicalResponseTime: historicalResponseTime,
        })
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
        <button className="dashboard-button" onClick={handleClick}>Dashboard</button>
    </div>
}