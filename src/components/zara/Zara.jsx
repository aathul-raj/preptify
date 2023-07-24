import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "./Title";
import Subheading from "./Subheading";
import Transcript from "./Transcript";
import MicButton from "./MicButton";
import Preloader from "./Preloader";
import { auth } from '../../back-end/Firebase';
import axios from 'axios';
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ZaraImages from "../../constants/ZaraImages";
import styles from "../../styles/Zara.module.css"

function Zara( {setIsDone, setFeedback, setResponseTimes, responseTimes, lagTimes, setLagTimes, setUserTranscript, setRole} ) {
  
  let navigate = useNavigate()
  let location = useLocation()
  const db = getFirestore()
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(true) // State to track loading status
  const queryParam = new URLSearchParams(location.search)
  const role = queryParam.get('role')
  setRole(role)
  // const industry = queryParam.get('industry')
  // const difficulty = queryParam.get('difficulty')
  const questions = queryParam.get('questions')
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        createUserInterviewLog();
        // Update interviewLog in Firestore
        updateInterviewLog({'Role' : `${role}`, 'NumQuestions' : `${questions}`});
        // zara-server.preptify.com
        // localhost:5001
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/start-interview`, {
          role: role,
          questions: questions
        }, {
          withCredentials: true
        })
          .then(response => {
            updateInterviewLog({'Server' : response.data.response})
            setTranscript(response.data.response);
            setResponseTimes([Date.now()])
            setLagTimes([Date.now()])
            setIsLoading(false); // Set loading to false once data is received
          }) 
          .catch(err => {
            console.error(err);
            // TODO: Create error for user
          });
      } else{
        navigate("/dashboard", { replace: true });
      }
    })
  }, []);

  useEffect(() => {console.log(lagTimes)}, [lagTimes])

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

  return (
    <>   
        <main>
        <div className={styles["container"]}>
          <div className={`${styles["heading"]} ${isLoading ? styles['hidden'] : styles['visible']}`}>
            <Title styles={styles}/>
            <Subheading styles={styles}/>
          </div>
          {isLoading ? <Preloader/> : <img className={`${styles["ai-img"]} ${isLoading ? styles['hidden'] : styles['visible']}`} src={ZaraImages.ai} />}
          <Transcript className={isLoading ? styles['hidden'] : styles['visible']} transcript={transcript} isLoading={isLoading} styles={styles}/>
        </div>
        <MicButton className={`${styles["mic-img"]} ${isLoading ? styles['hidden'] : styles['visible']}`} setTranscript={setTranscript} isLoading={isLoading} setIsDone={setIsDone} setFeedback={setFeedback} setResponseTimes={setResponseTimes} responseTimes={responseTimes} lagTimes={lagTimes} setLagTimes={setLagTimes} setUserTranscript={setUserTranscript}/>
        </main>
    </>
  );
}

export default Zara;
