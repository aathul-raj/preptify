import React, { useState, useRef } from 'react';
import axios from 'axios';
import Mic from '../img/microphone.png';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from '../back-end/firebase';

function MicButton({ setTranscript, isLoading, setIsDone, setFeedback, setInterviewLog }) {

  const db = getFirestore();

  const updateInterviewLog = async (newLogEntry) => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDoc, {
      interviewLog: arrayUnion(newLogEntry), // pass the object directly
    });
  };

  const [isListening, setIsListening] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const mediaRecorder = useRef(null);
  const mediaStream = useRef(null); // to save the stream
  const socketRef = useRef(null);
  const transcriptTimer = useRef(null);
  const handleDataAvailable = (event) => {
    if (event.data.size > 0 && socketRef.current && socketRef.current.readyState === 1) {
      socketRef.current.send(event.data);
    }
  };

  const stopListening = () => {
    console.log("Stopping to listen...")
    clearTimeout(transcriptTimer.current);
    mediaRecorder.current.removeEventListener('dataavailable', handleDataAvailable);
    mediaRecorder.current.stop();
    mediaStream.current.getTracks().forEach(track => track.stop()); // Stop the stream
    socketRef.current.close();
    setIsListening(false);
    console.log('POSTING')
    axios.post('https://zara-server.preptify.com/api/interview', {
      response: userResponse
    }, {
      withCredentials: true
    }).then(response => {
      setInterviewLog((prevInterviewLog) => {
        const newInterviewLog = [...prevInterviewLog, {'User' : userResponse}]
        // Update interviewLog in Firestore
        updateInterviewLog({'User' : userResponse});
        setUserResponse("")
        return newInterviewLog;
      })
      if (typeof response.data.response === 'object' && response.data.response !== null){
        setIsDone(true);
        setFeedback(response.data.response);
      }
      else {
        setInterviewLog((prevInterviewLog) => {
          const newInterviewLog = [...prevInterviewLog, {'Server' : response.data.response}]
          // Update interviewLog in Firestore
          updateInterviewLog({'Server' : response.data.response});

          return newInterviewLog;
        })
        setTranscript(response.data.response);
      }
    })
    .catch(err => {
      console.error(err)
    });
  };

  const toggleListening = () => {
    if (!isListening) {
      console.log("Starting to listen...");
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
    <img 
      className={`mic-img ${isListening ? 'pulse' : ''} ${isLoading ? 'hidden' : 'visible'}`} 
      src={Mic} 
      onClick={toggleListening}
    />
  )
}

export default MicButton;
