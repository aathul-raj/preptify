import React, { useState } from 'react'
import Zara from '../components/zara/Zara'
import Feedback from '../components/zara/Feedback'

export default function Interview(){
    const [isDone, setIsDone] = useState(false)
    const [feedback, setFeedback] = useState()
    const [responseTimes, setResponseTimes] = useState([])

    return (
        isDone 
        ? <Feedback feedback={feedback} responseTimes={responseTimes}/> 
        : <Zara setIsDone={setIsDone} setFeedback={setFeedback} setResponseTimes={setResponseTimes} responseTimes={responseTimes}/>
    )
}