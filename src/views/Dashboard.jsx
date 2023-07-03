import DashboardContent from "../components/dashboard/DashboardContent";
import Sidebar from "../components/dashboard/Sidebar";
import "../styles/dashboard.css";
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Popup from '../components/Popup'
export default function Dashboard(){
  const db = getFirestore();
  const [showPopup, setShowPopup] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // fetch the user's document from Firestore
      getDoc(doc(db, "users", user.uid)).then(userDoc => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // show the popup if the tutorial hasn't been shown yet
          if (!userData.tutorialShown) {
            setShowPopup(true);
          }
        }
      });
    }
  }, [])

  const closePopup = () => {
    setShowPopup(false);
    if (user) {
      // set the tutorialShown field to true
      setDoc(doc(db, "users", user.uid), { tutorialShown: true }, { merge: true });
    }
  };
  
  
  return user ? <div className="dashboard-container">
                  <Sidebar/>
                  <DashboardContent/>
                  {showPopup && <Popup onClose={closePopup} />}
                </div> : null
}