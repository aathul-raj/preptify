import React, { useState, useRef } from 'react';
import axios from 'axios';
import Mic from '../img/microphone.png';

function MicButton({ setTranscript, isLoading, setIsDone, setFeedback }) {
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
    axios.post('http://localhost:5001/api/interview', {
      response: userResponse
    }, {
      withCredentials: true
    }).then(response => {
      if (typeof response.data.response === 'object' && response.data.response !== null){
        setIsDone(true);
        setFeedback(response.data.response);
      }
      else {
        console.log(`Server Response: ${response.data.response}`);
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
