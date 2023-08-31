import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Category from './Category'
import useEngine from '../../../hooks/ZaraEngine'
import { doc, updateDoc, getDoc, increment, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import CountUp from 'react-countup';
import ZaraImages from '../../../constants/ZaraImages';
import styles from "../../../styles/zara/Feedback.module.css"

export default function Feedback( {feedback, setFeedback, responseTimes, lagTimes, userTranscript, role} ){
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
    let responseTimeSum = false;
    if (lagTimes.length > 1){
        responseTimeSum = responseTimes.reduce((a, b) => a + b, 0);
    }
    const questionCount = responseTimes.length

    useEffect(() => {
        let adjustments;
        if (lagTimes.length == 1){
            adjustments = useEngine({feedback, userTranscript, role});
        } else{
            adjustments = useEngine({feedback, userTranscript, role, responseTimes, lagTimes});
        }
        
        const adjScore = score + adjustments["overall"]

        setFeedback(prevFeedback => {
            const adjComm = prevFeedback["communication"] + adjustments["comm"]
            const adjTech = prevFeedback["technical"] + adjustments["tech"]
            const adjPS = prevFeedback["ps"] + adjustments["ps"]
            const adjBehavioral = prevFeedback["behavioral"] + adjustments["behavioral"]

            return {...prevFeedback, "behavioral" : adjBehavioral, "technical" : adjTech, "ps" : adjPS, "communication" : adjComm}
        })

        const userRef = doc(db, 'users', currentUser.uid);
        updateDoc(userRef, {
            interviewsCompleted: increment(1),
            recentFeedback: {...feedback, "overallScore": score + adjScore, "responseTime" : responseTimeSum}
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
        
        for (let key in recentFeedback) {
            if (key == "responseTime") {
                if (responseTimeSum){
                    newFeedbackSummary[key] = {
                        ...newFeedbackSummary[key],
                        total: responseTimeSum + newFeedbackSummary[key].total,
                        count: questionCount + newFeedbackSummary[key].count
                    }
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
        
        if (responseTimeSum) {
            historicalResponseTime = [...historicalResponseTime, ...responseTimes]
        } else {
            historicalResponseTime = [...historicalResponseTime]
        }

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
    
    return (
        <div className={styles["feedback-container"]}>
            <img src={ZaraImages.confetti} className={`${styles["parallax"]} ${styles["confetti-1"]}`} data-value=".5"/>
            <img src={ZaraImages.confetti} className={`${styles["parallax"]} ${styles["confetti-2"]}`} data-value=".5"/>
            <h1 className={styles["zara"]}><span className={styles["green"]}>Z</span>ARA</h1>
            <div className={styles["top-text"]}>
                <h2 className={styles["completed"]}>Interview <span className={styles["green"]}>Completed!</span></h2>
                <h3 className={styles["score"]}>Overall Score: <span className={styles["green"]}><CountUp end={score} duration={5} decimals={1} decimal={'.'} delay={1}/>/10</span></h3>
            </div>
            <div className={styles["feedback-content"]}>
                <div className={styles["category-container"]}>
                    <Category category="Behavioral Responses" score={behaviorScore}/>
                    <Category category="Problem Solving" score={problemScore}/>
                    <Category category="Comm. Skills" score={commScore}/>
                    <Category category="Technical Skills" score={techScore}/>
                </div>
                <div className={styles["comments-container"]}>
                    <ul>
                        <li className={styles["negative-feedback"]}>{negativeOne}</li>
                        <li className={styles["negative-feedback"]}>{negativeTwo}</li>
                        <li className={styles["positive-feedback"]}>{positive}</li>
                    </ul>
                </div>
            </div>
            <h2 className={styles["notice"]}>All scores are out of 10</h2>
            <button className={styles["dashboard-button"]} onClick={handleClick}>Dashboard</button>
        </div>
    );
}