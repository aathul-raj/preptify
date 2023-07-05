import { useState, useEffect } from "react";
import Title from "./Title";
import Subheading from "./Subheading";
import Transcript from "./Transcript";
import MicButton from "./MicButton";
import AIImage from "../img/preloader.gif";
import "../styles/Zara.css";
import Preloader from "./Preloader";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from '../back-end/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Zara( {setIsDone, setFeedback} ) {
  
  let navigate = useNavigate();
  const db = getFirestore();
  // This is the transcript state
  const [interviewLog, setInterviewLog] = useState([])
  console.log(interviewLog)
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  let location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const role = queryParam.get('role')
  // const industry = queryParam.get('industry')
  // const difficulty = queryParam.get('difficulty')
  const questions = queryParam.get('questions')
  
  const createUserInterviewLog = async () => {
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      interviewLog: [],
    }, { merge: true });
  };

  const updateInterviewLog = async (newLogEntry) => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDoc, {
      interviewLog: arrayUnion(newLogEntry), // pass the object directly
    });
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        createUserInterviewLog();
        setInterviewLog((prevInterviewLog) => {
          const newInterviewLog = [...prevInterviewLog, {'Role' : `${role}`, 'NumQuestions' : `${questions}`}]
          // Update interviewLog in Firestore
          updateInterviewLog({'Role' : `${role}`, 'NumQuestions' : `${questions}`});

          return newInterviewLog;
        })
        // zara-server.preptify.com
        // localhost:5001
        axios.post('http://zara-server.preptify.com/api/start-interview', {
          role: role,
          questions: questions
        }, {
          withCredentials: true
        })
          .then(response => {
            setInterviewLog((prevInterviewLog) => {
              const newInterviewLog = [...prevInterviewLog, {'Server' : response.data.response}]
              updateInterviewLog({'Server' : response.data.response})
              return newInterviewLog
            })
            setTranscript(response.data.response);
            setIsLoading(false); // Set loading to false once data is received
          })
          .catch(err => {
            console.error(err);
          });
      } else{
        navigate("/dashboard", { replace: true });
      }
    })
  }, []);

  return (
    <>   
        <main>
        <div className="container">
          <div className={`heading ${isLoading ? 'hidden' : 'visible'}`}>
            <Title />
            <Subheading />
          </div>
          {isLoading ? <Preloader/> : <img className={`ai-img ${isLoading ? 'hidden' : 'visible'}`} src={AIImage} />}
          <Transcript className={isLoading ? 'hidden' : 'visible'} transcript={transcript} isLoading={isLoading}/>
        </div>
        <MicButton className={`mic-img ${isLoading ? 'hidden' : 'visible'}`} setTranscript={setTranscript} isLoading={isLoading} setIsDone={setIsDone} setFeedback={setFeedback} setInterviewLog={setInterviewLog}/>
        </main>
    </>
  );
}

export default Zara;
