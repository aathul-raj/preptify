import React, { useState, useRef } from 'react';
import { auth } from '../../../back-end/Firebase';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons'
import styles from "../../../styles/zara/MicButton.module.css"

function MicButton({ setTranscript, isLoading, setIsDone, setFeedback, setResponseTimes, responseTimes, lagTimes, setLagTimes, setUserTranscript, index, eyesOn, setEyesOn }) {

  const db = getFirestore();
  const [isListening, setIsListening] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const mediaRecorder = useRef(null);
  const mediaStream = useRef(null); // to save the stream
  const socketRef = useRef(null);
  const transcriptTimer = useRef(null);
  

  const updateInterviewLog = async (newLogEntry) => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDoc, {
      interviewLog: arrayUnion(newLogEntry), // pass the object directly
    })
  }
  
  const handleDataAvailable = (event) => {
    if (event.data.size > 0 && socketRef.current && socketRef.current.readyState === 1) {
      socketRef.current.send(event.data);
    }
  }

  const stopListening = () => {
    clearTimeout(transcriptTimer.current);
    let startTime = responseTimes[responseTimes.length - 1]
    let responseTime = Date.now() - startTime
    setResponseTimes((prevResponseTimes) => {
      prevResponseTimes[prevResponseTimes.length - 1] = responseTime / 1000
      return prevResponseTimes
    })
    mediaRecorder.current.removeEventListener('dataavailable', handleDataAvailable);
    mediaRecorder.current.stop();
    mediaStream.current.getTracks().forEach(track => track.stop()); // Stop the stream
    socketRef.current.close();
    setIsListening(false);
    axios.post(`${import.meta.env.VITE_SERVER_URL}/api/interview`, {
      response: userResponse
    }, {
      withCredentials: true
    }).then(response => {
      // Update interviewLog in Firestore
      updateInterviewLog({'User' : userResponse});
      setUserResponse("")
      if (typeof response.data.response === 'object' && response.data.response !== null){
        setIsDone(true);
        setFeedback(response.data.response);
      }
      else {
        // Update interviewLog in Firestore
        updateInterviewLog({'Server' : response.data.response});
        setTranscript(response.data.response);
        setLagTimes((prevLagTimes) => [...prevLagTimes, Date.now()])
      }
    })
    .catch(err => {
      console.error(err)
    });
  };

  const toggleListening = () => {
    setEyesOn(!eyesOn)
    if (!isListening) {
      let startTime = lagTimes[lagTimes.length - 1]
      let responseTime = Date.now() - startTime
      setResponseTimes((prevResponseTimes) => [...prevResponseTimes, Date.now()])
      setLagTimes((prevLagTimes) => {
        prevLagTimes[prevLagTimes.length - 1] = responseTime / 1000
        return prevLagTimes
      })
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaStream.current = stream; // Save the stream
        mediaRecorder.current = new MediaRecorder(stream);
        socketRef.current = new WebSocket('wss://api.deepgram.com/v1/listen?smart_format=true', ['token', import.meta.env.VITE_DEEPGRAM_API_KEY]);
        socketRef.current.onopen = () => {
          mediaRecorder.current.addEventListener('dataavailable', handleDataAvailable);
          mediaRecorder.current.stop();
          mediaRecorder.current.start(150);
        };
        
        socketRef.current.onmessage = (message) => {
          const received = JSON.parse(message.data);
          const transcript = received.channel.alternatives[0].transcript;
          if (transcript && received.is_final) {
            setUserResponse(prevResponse => prevResponse + `\n` + transcript);
            setUserTranscript(prevTranscript => prevTranscript + '\n' + transcript)
            clearTimeout(transcriptTimer.current);
            transcriptTimer.current = setTimeout(stopListening, 30000); // restart the timer whenever there is speech
          }
        };

        socketRef.current.onclose = () => {
          // do this when the connection is closed
        };
        
        socketRef.current.onerror = (error) => {
          // do this when the connection receives an error
        };
      });

      transcriptTimer.current = setTimeout(stopListening, 30000);
      setIsListening(true);
    } else {
      stopListening();
    }
  };

  return (
    <button className={`${styles["btn"]} ${isLoading ? styles['hidden'] : styles['visible']} ${index === 2 ? styles['highlight'] : ''}`} onClick={toggleListening}>
    {
        isListening ?
        <>
            <FontAwesomeIcon icon={faStop} className={`${styles["icon"]} ${styles["blink-red"]}`}/> {/* Stop icon when recording */}
            <span className={styles["record-text"]}>submit</span> 
        </>
        :
        <>
            <FontAwesomeIcon icon={faMicrophone} className={styles["icon"]}/> {/* Microphone icon when not recording */}
            <span className={styles["record-text"]}>record</span>
        </>
    }
</button>

  )
}

export default MicButton;