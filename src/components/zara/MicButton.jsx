import React, { useState, useRef } from 'react';
import { auth } from '../../back-end/Firebase';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/MicButton.module.css"

function MicButton({ setTranscript, isLoading, setIsDone, setFeedback, setResponseTimes, responseTimes, lagTimes, setLagTimes, setUserTranscript }) {

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
    console.log("Stopping to listen...")
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
    console.log('POSTING')
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
        setResponseTimes((prevResponseTimes) => [...prevResponseTimes, Date.now()])
        setLagTimes((prevLagTimes) => [...prevLagTimes, Date.now()])
      }
    })
    .catch(err => {
      console.error(err)
    });
  };

  const toggleListening = () => {
    if (!isListening) {
      console.log("Starting to listen...");
      let startTime = lagTimes[lagTimes.length - 1]
      let responseTime = Date.now() - startTime
      setLagTimes((prevLagTimes) => {
        prevLagTimes[prevLagTimes.length - 1] = responseTime / 1000
        return prevLagTimes
      })
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaStream.current = stream; // Save the stream
        mediaRecorder.current = new MediaRecorder(stream);
        socketRef.current = new WebSocket('wss://api.deepgram.com/v1/listen?smart_format=true', ['token', import.meta.env.VITE_DEEPGRAM_API_KEY]);
        socketRef.current.onopen = () => {
          console.log({ event: 'onopen' });
          mediaRecorder.current.addEventListener('dataavailable', handleDataAvailable);
          mediaRecorder.current.stop();
          mediaRecorder.current.start(150);
        };
        
        socketRef.current.onmessage = (message) => {
          const received = JSON.parse(message.data);
          const transcript = received.channel.alternatives[0].transcript;
          if (transcript && received.is_final) {
            console.log(`TRANSCRIPT: ${transcript}`);
            setUserResponse(prevResponse => prevResponse + `\n` + transcript);
            setUserTranscript(prevTranscript => prevTranscript + '\n' + transcript)
            clearTimeout(transcriptTimer.current);
            transcriptTimer.current = setTimeout(stopListening, 30000); // restart the timer whenever there is speech
          }
        };

        socketRef.current.onclose = () => {
          console.log({ event: 'onclose' });
        };
        
        socketRef.current.onerror = (error) => {
          console.log({ event: 'onerror', error });
        };
      });

      transcriptTimer.current = setTimeout(stopListening, 30000);
      setIsListening(true);
    } else {
      stopListening();
    }
  };

  return (
    <button className={`${styles["btn"]} ${isListening ? styles['animate'] : ''} ${isLoading ? styles['hidden'] : styles['visible']}`} onClick={toggleListening}>
      <div className={styles["pulse-ring"]}></div>
      <FontAwesomeIcon icon={faMicrophone}/>
    </button>
  )
}

export default MicButton;