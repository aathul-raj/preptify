import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DashboardContent from "../components/dashboard/DashboardContent";
import Setting from "../components/dashboard/Settings";
import Sidebar from "../components/dashboard/Sidebar";
import Popup from '../components/Popup';
import { auth } from '../back-end/Firebase';
import { getFirestore, onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import styles from "../styles/Dashboard.module.css"

export default function Dashboard(){
  const db = getFirestore();
  const [activeItem, setActiveItem] = useState('dashboard');
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
        unsubscribeSubscription = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const subscriptionData = userData.subscription; // Access subscription field
          } else {
            // do something if user document doesn't exist -- can potentially delete this
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

  // const closePopup = () => {
  //   setShowPopup(false);
  //   if (currentUser) {
  //     // set the tutorialShown field to true
  //     setDoc(doc(db, "users", currentUser.uid), { tutorialShown: true }, { merge: true });
  //   }
  // }

  const screens = { 'dashboard' : <DashboardContent styles={styles}/>,
                      'settings' : <Setting styles={styles}/>
}
  
  return currentUser ? <div className={styles["dashboard-container"]}>
                  <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} styles={styles}/>
                  {screens[activeItem]}
                  {/* {showPopup && <Popup onClose={closePopup} styles={styles}/>} */}
                </div> : null
}