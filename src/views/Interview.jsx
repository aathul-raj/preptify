import React, { useState } from 'react'
import Zara from '../components/zara/Zara'
import Feedback from '../components/zara/Feedback'

export default function Interview(){
    const [isDone, setIsDone] = useState(false)
    const [feedback, setFeedback] = useState()

    return (
        isDone 
        ? <Feedback feedback={feedback}/> 
        : <Zara setIsDone={setIsDone} setFeedback={setFeedback}/>
    )
}