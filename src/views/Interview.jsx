import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Zara from '../components/zara/Zara'
import Feedback from '../components/zara/Feedback'

export default function Interview(){
    const [isDone, setIsDone] = useState(false)
    const [feedback, setFeedback] = useState()
    const [responseTimes, setResponseTimes] = useState([])
    const [lagTimes, setLagTimes] = useState([])
    const [userTranscript, setUserTranscript] = useState("")
    const [role, setRole] = useState("")
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state || !location.state.fromButton) {
            // if from button state doesnt exist, redirect to dashboard
            navigate('/dashboard')
        }
    }, [location])

    return (
        isDone 
        ? <Feedback feedback={feedback} setFeedback={setFeedback} responseTimes={responseTimes} lagTimes={lagTimes} userTranscript={userTranscript} role={role}/> 
        : <Zara setIsDone={setIsDone} setFeedback={setFeedback} setResponseTimes={setResponseTimes} responseTimes={responseTimes} lagTimes={lagTimes} setLagTimes={setLagTimes} setUserTranscript={setUserTranscript} setRole={setRole}/>
    )
}