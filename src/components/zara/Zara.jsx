import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "./Title";
import Subheading from "./Subheading";
import Transcript from "./Transcript";
import MicButton from "./MicButton";
import Preloader from "./Preloader";
import Tutorial from "./Tutorial";
import { auth } from '../../back-end/Firebase';
import axios from 'axios';
import { getFirestore, doc, setDoc, updateDoc, getDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ZaraImages from "../../constants/ZaraImages";
import styles from "../../styles/Zara.module.css"
import ZaraAnimation from "./ZaraAnimation";

function Zara( {setIsDone, setFeedback, setResponseTimes, responseTimes, lagTimes, setLagTimes, setUserTranscript, setRole} ) {
  
  let navigate = useNavigate()
  let location = useLocation()
  const db = getFirestore()
  const [eyesOn, setEyesOn] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(true) // State to track loading status
  const [showPopup, setShowPopup] = useState(false);
  const [index, setIndex] = useState(0);
  const queryParam = new URLSearchParams(location.search)
  const role = queryParam.get('role')
  setRole(role)
  // const industry = queryParam.get('industry')
  // const difficulty = queryParam.get('difficulty')
  const questions = queryParam.get('questions')
  
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        createUserInterviewLog();
        updateInterviewLog({'Role' : `${role}`, 'NumQuestions' : `${questions}`});

        await getDoc(doc(db, "users", auth.currentUser.uid)).then(userDoc => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.tutorialShown != undefined && !userData.tutorialShown) {
              setShowPopup(true);
            }
          }
        });

        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/start-interview`, {
          role: role,
          questions: questions
        }, {
          withCredentials: true
        })
          .then(response => {
            updateInterviewLog({'Server' : response.data.response})
            setTranscript(response.data.response);
            setLagTimes([Date.now()])
            setIsLoading(false);
          }) 
          .catch(err => {
            console.error(err);
          });
      } else{
        navigate("/dashboard", { replace: true });
      }
    })

    return () => {
      unsubscribeAuth();
    };
}, []);


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

  const handleTutorial = async () => {
    setShowPopup(false)
    await setDoc(doc(db, "users", auth.currentUser.uid), { tutorialShown: true }, { merge: true });
    setLagTimes([Date.now()])
  }

  return (
    <>   
        <main>
        {showPopup && <Tutorial styles={styles} isLoading={isLoading} index={index} setIndex={setIndex} handleTutorial={handleTutorial}/>}
        <div className={styles["container"]}>
          <div className={`${styles["heading"]} ${isLoading ? styles['hidden'] : styles['visible']}`}>
            <Title styles={styles}/>
            <Subheading styles={styles}/>
          </div>
          {isLoading ? <Preloader/> : <ZaraAnimation className={`${styles["ai-img"]} ${isLoading ? styles['hidden'] : styles['visible']}`} eyesOn={eyesOn}/>}
          <Transcript className={`${isLoading ? styles['hidden'] : styles['visible']}`} transcript={transcript} isLoading={isLoading} styles={styles} index={index}/>
        </div>
        <MicButton className={`${styles["mic-img"]} ${isLoading ? styles['hidden'] : styles['visible']}`} index={index} setTranscript={setTranscript} isLoading={isLoading} setIsDone={setIsDone} setFeedback={setFeedback} setResponseTimes={setResponseTimes} responseTimes={responseTimes} lagTimes={lagTimes} setLagTimes={setLagTimes} setUserTranscript={setUserTranscript} eyesOn={eyesOn} setEyesOn={setEyesOn}/>
        </main>
    </>
  );
}

export default Zara;
