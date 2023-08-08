import { useState, useEffect } from "react"
import Tile from "../Tile"
import Pro from "../Pro"
import RecentFeedback from "../RecentFeedback"
import CategoryScores from "../CategoryScores"
import Graph from "../Graph"
import { auth } from '../../../back-end/Firebase';
import { doc, getFirestore, onSnapshot } from "firebase/firestore";


export default function BasicAnalytics( {styles} ){
    const db = getFirestore();
    const currentUser = auth.currentUser; 
    const [feedbackSummary, setFeedbackSummary] = useState(null);
    const [historicalScores, setHistoricalScores] = useState([]);
    const [historicalResponseTime, setHistoricalResponseTime] = useState([])
    let recentFeedback = ["N/A", "N/A", "N/A"]
    let interviewCount = "N/A"

    useEffect(() => {
        const fetchData = async () => {
            const userRef = doc(db, 'users', currentUser.uid);
            const unsubscribe = onSnapshot(userRef, (doc) => {
                let userData = doc.data();
                if (userData.feedbackSummary){
                    setFeedbackSummary(userData.feedbackSummary);
                }
                if (userData.historicalScores){
                    setHistoricalScores(userData.historicalScores);
                    setHistoricalResponseTime(userData.historicalResponseTime)
                }
            });
    
            // Detach the listener when the component unmounts
            return () => unsubscribe();
        }
    
        fetchData();
    }, []);

    let overallScore = "N/A"
    let communication = 0
    let technical = 0
    let ps = 0
    let behavioral = 0
    let responseTime = 0
    if (feedbackSummary){
        responseTime = Math.round((feedbackSummary["responseTime"].total / feedbackSummary["responseTime"].count))
        overallScore = (feedbackSummary["overallScore"].total / feedbackSummary["overallScore"].count).toFixed(1)
        communication = Math.round(feedbackSummary["communication"].total / feedbackSummary["communication"].count)
        technical = Math.round(feedbackSummary["technical"].total / feedbackSummary["technical"].count)
        ps = Math.round(feedbackSummary["ps"].total / feedbackSummary["ps"].count)
        behavioral = Math.round(feedbackSummary["behavioral"].total / feedbackSummary["behavioral"].count)
        recentFeedback = [feedbackSummary["negative1"], feedbackSummary["negative2"], feedbackSummary["positive1"]]
        interviewCount = historicalScores.length
    }

    let percentChange = "N/A"
    let responsePercentChange = "N/A"
    if (historicalScores.length >= 2){
        let total = historicalScores.reduce((a, b) => a + b, 0);
        let totalWithoutLast = total - historicalScores[historicalScores.length - 1];

        let averageAll = total / historicalScores.length;
        let averageWithoutLast = totalWithoutLast / (historicalScores.length - 1);

        percentChange = ((averageAll - averageWithoutLast) / averageWithoutLast * 100).toFixed(1);
        
        if (responseTime <= 60) {
            let responseTotal = historicalResponseTime.reduce((a,b) => a + b, 0)
            let responseTotalWithoutLast = responseTotal - historicalResponseTime[historicalResponseTime.length - 1]

            let responseAverage = responseTotal / historicalResponseTime.length
            let responseAverageWithoutLast = responseTotalWithoutLast / (historicalResponseTime.length - 1)

            responsePercentChange = ((responseAverage - responseAverageWithoutLast) / responseAverageWithoutLast * 100).toFixed(1)
        } else {
            responseTime = "60+"
        }
    }

    // TODO: Average word count per answer/most used words (I guess this means look into cleaning up user response whether with deepgram or some other apib )
    
    return <>
        <CategoryScores styles={styles} communication={communication} technical={technical} ps={ps} behavioral={behavioral}/>
        <Tile styles={styles} name="average-time" heading="Seconds to Answer" subheading={responsePercentChange != "N/A" ? `${Math.abs(responsePercentChange)}% ${responsePercentChange > 0 ? "increase" : "decrease"} after last interview` : "N/A"} score={responseTime} status="increase"/>
        <Tile styles={styles} name="overall-score" heading="Overall Score" subheading={percentChange != "N/A" ? `${Math.abs(percentChange)}% ${percentChange > 0 ? "increase" : "decrease"} after last interview` : "N/A"} score={overallScore} status={`${percentChange > 0 ? "increase" : "decrease"}`}/>
        <Graph styles={styles} historicalScores={historicalScores}/>
        <RecentFeedback styles={styles} recentFeedback={recentFeedback}/>
        <Pro styles={styles}/>
        <Tile styles={styles} name="interviews-completed" heading="Interviews Completed" subheading="Keep it going!" score={interviewCount} status="increase"/>
    </>
}