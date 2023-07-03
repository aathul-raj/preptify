import DashboardContent from "../components/dashboard/DashboardContent";
import Sidebar from "../components/dashboard/Sidebar";
import "../styles/dashboard.css";
import { useNavigate } from 'react-router-dom';
import { auth } from '../back-end/firebase';
import { useEffect, useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Popup from '../components/Popup'
export default function Dashboard(){
  const db = getFirestore();
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useeffect')
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login');
      } else {
        setCurrentUser(user);
        console.log('fetching')
        // fetch the user's document from Firestore
        getDoc(doc(db, "users", user.uid)).then(userDoc => {
          if (userDoc.exists()) {
            console.log('user doc exists')
            const userData = userDoc.data();
            // show the popup if the tutorial hasn't been shown yet
            if (!userData.tutorialShown) {
              console.log('showing tutorials')
              setShowPopup(true);
            }
          }
        });
      }
    });
}, []);

  const closePopup = () => {
    setShowPopup(false);
    if (currentUser) {
      // set the tutorialShown field to true
      setDoc(doc(db, "users", currentUser.uid), { tutorialShown: true }, { merge: true });
    }
  };
  
  return currentUser ? <div className="dashboard-container">
                  <Sidebar/>
                  <DashboardContent/>
                  {showPopup && <Popup onClose={closePopup} />}
                </div> : null
}