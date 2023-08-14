import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import GreenDashContent from "../components/dashboard/green-user/GreenDashContent";
import BasicDashContent from "../components/dashboard/basic-user/BasicDashContent";
import LoadingDash from "../components/dashboard/LoadingDash";
import Setting from "../components/dashboard/Settings";
import Sidebar from "../components/dashboard/Sidebar";
import { auth } from '../back-end/Firebase';
import { getFirestore, onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import styles from "../styles/Dashboard.module.css"

export default function Dashboard(){
  const db = getFirestore();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sub, setSub] = useState('loading')
  // const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  const getDash = () => {
    if (sub === null){
      return <BasicDashContent styles={styles}/>
    } else {
      return <GreenDashContent styles={styles}/>
    }
  }

  const screens = { 'dashboard' : getDash(),
                      'settings' : <Setting styles={styles} subscriptionStatus={sub}/>
}
  
  return sub != 'loading' ? <div className={styles["dashboard-container"]}>
                  <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} styles={styles}/>
                  {screens[activeItem]}
                </div> : <LoadingDash styles={styles}/>
}