import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Mic from '../img/mic.png';

function MicButton({ setTranscript, isLoading }) {
  const [isListening, setIsListening] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const navigate = useNavigate()
  const mediaRecorder = useRef(null);
  const socketRef = useRef(null);

  const toggleListening = () => {
    console.log("TOGGLE")
    const handleDataAvailable = (event) => {
      if (event.data.size > 0 && socketRef.current && socketRef.current.readyState === 1) {
        socketRef.current.send(event.data);
      }
    };

    if (!isListening) {
      console.log("Starting to listen...");
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
          mediaRecorder.current = new MediaRecorder(stream);
          socketRef.current = new WebSocket('wss://api.deepgram.com/v1/listen?smart_format=true', [ 'token', '29f733e066377ee7fa0c4d4114a9483ecf7cfa31' ])
          socketRef.current.onopen = () => {
            console.log({ event: 'onopen' })
            mediaRecorder.current.addEventListener('dataavailable', handleDataAvailable)
            mediaRecorder.current.stop()
            mediaRecorder.current.start(150)
          }
          
          socketRef.current.onmessage = (message) => {
            const received = JSON.parse(message.data)
            const transcript = received.channel.alternatives[0].transcript
            if (transcript && received.is_final) {
              console.log(`TRANSCRIPT: ${transcript}`)
              setUserResponse(prevResponse => prevResponse + `\n` + transcript)
            }
          }

          socketRef.current.onclose = () => {
            console.log({ event: 'onclose' })
          }
          
          socketRef.current.onerror = (error) => {
            console.log({ event: 'onerror', error })
          }
        }
      )
      setIsListening(true)
    } else {
      console.log("Stopping to listen...")
      mediaRecorder.current.removeEventListener('dataavailable', handleDataAvailable);
      mediaRecorder.current.stop();
      socketRef.current.close()
      console.log('POSTING')
      axios.post('http://localhost:5001/api/interview', {
        response: userResponse
      }).then(response => {
        if (typeof response.data.response === 'object' && response.data.response !== null){
          navigate("/", {replace: true })
        }
        else {
          console.log(`Server Response: ${response.data.response}`)
          setTranscript(response.data.response)
        }
      })
      .catch(err => {
        console.error(err)
      })

      setIsListening(false)
    }
}

  return (
    <img 
      className={`mic-img ${isLoading ? 'hidden' : 'visible'}`} 
      src={Mic} 
      onClick={toggleListening}
    />
  )
}

export default MicButton