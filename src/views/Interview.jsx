import Zara from '../components/Zara'
import Feedback from '../components/Feedback'
import React, { useState } from 'react'

export default function Interview(){
    const [isDone, setIsDone] = useState(false)
    const [feedback, setFeedback] = useState()
    console.log(isDone)
    return (
        isDone 
        ? <Feedback feedback={feedback}/> 
        : <Zara setIsDone={setIsDone} setFeedback={setFeedback}/>
    );
}