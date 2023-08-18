import React, { useState } from 'react';
import { auth } from '../../back-end/Firebase';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from 'axios';
import styles from "../../styles/Textbox.module.css"; 

function Textbox({ setTranscript, setIsDone, setFeedback, isLoading }) {
  const db = getFirestore();
  const [userResponse, setUserResponse] = useState("");
  
  // Update interview log 
  const updateInterviewLog = async (newLogEntry) => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDoc, {
      interviewLog: arrayUnion(newLogEntry), // pass the object directly
    })
  }

  // Sends user input to server (send button)
  const sendResponse = (event) => {
    event.preventDefault();
    if (!userResponse.trim()) {  // Check if userResponse is empty or only whitespace
      return;  // Exit the function
    }
    onSubmit();

    // Reset the textbox
    event.target.style.height = 'auto'; 
  }

  // Sends user input to server (enter)
  const onSubmit = () => {
    if (!userResponse.trim()) {  // Check if userResponse is empty or only whitespace
      return;  // Exit the function
    }
    console.log(userResponse); 
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
      }
    })
    .catch(err => {
      console.error(err)
    });
  };

  // Updates input text state variable 
  const handleInputChange = (event) => {
    setUserResponse(event.target.value); //input text
    adjustTextAreaHeight(event.target)
  };

  // Handles textbox height adjustment 
  const adjustTextAreaHeight = (textArea) => {
    const prevHeight = textArea.style.height.replace('px', '');
    
    textArea.style.height = 'auto';
    const newHeight = textArea.scrollHeight;
    
    textArea.style.height = newHeight + 'px';
    
    // Adjust the bottom position so it grows upwards
    textArea.style.bottom = parseInt(prevHeight) - newHeight + 'px';
};

  // If Enter is pressed, user input is sent to server 
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!userResponse.trim()) {  // Check if userResponse is empty or only whitespace
        return;  // Exit the function
      }
      onSubmit();
      event.target.value = '';
      // Reset the textbox
      event.target.style.height = 'auto'; 
    }
  };

  return (
    <div className={`${styles["textboxContainer"]} ${isLoading ? styles['hidden'] : styles['visible']}`}>
      <textarea
        className={`${styles["textArea"]}`}
        value={userResponse}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your response..."
        rows={1} 
      />
      <svg className={`${styles["sendButton"]}`} xmlns="http://www.w3.org/2000/svg" width="30" height="35" viewBox="0 0 30 35" fill="none" onClick={sendResponse}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.03905 16.3733L2.13778 5.08916C1.10893 2.72049 0.594515 1.53615 1.0672 0.992029C1.53988 0.447909 2.56871 1.04008 4.62639 2.22441L27.7453 15.5309C29.1931 16.3643 29.917 16.7809 29.917 17.4408C29.917 18.1006 29.1931 18.5173 27.7453 19.3506L4.6264 32.6571C2.56872 33.8415 1.53988 34.4336 1.0672 33.8895C0.594516 33.3454 1.10894 32.161 2.13777 29.7924L7.03895 18.5085L17.9743 18.5085C18.4865 18.5085 18.9018 18.0305 18.9018 17.4409C18.9018 16.8513 18.4865 16.3733 17.9743 16.3733L7.03905 16.3733Z" fill="white"/>
      </svg>
    </div>
  )
}

export default Textbox;