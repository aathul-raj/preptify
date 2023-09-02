import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import GreenDashContent from "../components/dashboard/green-user/GreenDashContent";
import BasicDashContent from "../components/dashboard/basic-user/BasicDashContent";
import LoadingDash from "../components/dashboard/LoadingDash";
import Popup from "../components/ResumePopup"
import Setting from "../components/dashboard/settings/Settings";
import Sidebar from "../components/dashboard/Sidebar";
import { auth } from '../back-end/Firebase';
import { getFirestore, onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import styles from "../styles/views/Dashboard.module.css"

export default function Dashboard(){
  const location = useLocation();
  const db = getFirestore();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sub, setSub] = useState('loading')
  // const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [resumeInterviews, setResumeInterviews] = useState(false);
  const fromResume = location.state?.fromResume;
  const [fadeOut, setFadeOut] = useState(false);
  const[resume, setResume] = useState(null);
  

  useEffect(() => {
    console.log(location.state?.fromResume)
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login');
      } else {
        setCurrentUser(user);
        // fetch the user's document from Firestore
        getDoc(doc(db, "users", user.uid)).then(async userDoc => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (!userData.tutorialShown) {
              // show the popup if the tutorial hasn't been shown yet
              //setShowPopup(true);
            }
            if (!userData.resumePopupShown){
              setShowResumePrompt(true)
              await setDoc(doc(db, "users", user.uid), {
                resumePopupShown: true
              }, {merge: true})
            }

            if (userData.resume){
              setResume(userData.resume)
              setResumeInterviews(true)
              console.log(resume)
            }
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    // Tracks user's subscription status
    let unsubscribeSubscription;
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        unsubscribeSubscription = onSnapshot(userDocRef, async (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();

            if (userData.subscription === undefined) {
              // If it doesn't exist, create it with a value of null
              await setDoc(doc(db, "users", user.uid), {
                subscription: null
              }, { merge: true });
            }
            
            setSub(userData.subscription) 
            // ABOVE, sub field
          } else {
            // NEW USER, INIT DOC
            await setDoc(doc(db, "users", user.uid), {
              subscription: null
            });
          }
        });
      }
    });
  
    // Cleanup listener when the component is unmounted
    return () => {
      if (unsubscribeSubscription) {
        unsubscribeSubscription();
      }
    };
  }, []);

  useEffect(() => {
    if (fromResume) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        navigate(location.pathname, { state: {} });
      }, 5000); // 5 seconds
      return () => clearTimeout(timer); // Clear the timer if the component is unmounted before the timer finishes
    }
  }, [fromResume]);

  const getDash = () => {
    if (sub === null){
      return <BasicDashContent sub={sub} styles={styles} resumeInterviews={resumeInterviews} resume={resume}/>
    } else {
      return <GreenDashContent sub={sub} styles={styles} resumeInterviews={resumeInterviews} resume={resume}/>
    }
  }

  const screens = { 'dashboard' : getDash(),
                      'settings' : <Setting styles={styles} subscriptionStatus={sub}/>
  }
  
  return sub != 'loading' ? <div className={styles["dashboard-container"]}>
                  {showResumePrompt && <Popup/>}
                  {fromResume && 
                    <div className={`${styles["upload-popup"]} ${fadeOut ? styles['fade-out'] : ''}`}>
                      <span>Resume uploaded successfully!</span>
                    </div>
                  }
                  <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} styles={styles}/>
                  {screens[activeItem]}
                </div> : <LoadingDash styles={styles}/>
}
