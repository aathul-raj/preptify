import React, { useState, useEffect } from "react";
import styles from "../../styles/Settings.module.css"
import { auth, db } from '../../back-end/Firebase';
import { doc, onSnapshot } from "firebase/firestore";

export default function SettingsZaraGreen() {
    const [subscriptionData, setSubscriptionData] = useState(null);

    useEffect(() => {
        // Tracks user's subscription status
        let unsubscribeSubscription;
        auth.onAuthStateChanged((user) => {
          if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            unsubscribeSubscription = onSnapshot(userDocRef, (docSnapshot) => {
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const subscriptionStatus = userData.subscription; // Access subscription field
                setSubscriptionData(subscriptionStatus);
                console.log(subscriptionData); 
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

    function manageAccount() {
        return () => {
            // Open the billing link in new tab 
            window.open("https://billing.stripe.com/p/login/fZe4iRd9Z0ZxdPycMM", "_blank");
        }
    }

    function pricing() {
        return () => {
        // Open the billing link in new tab 
        window.open("https://www.preptify.com/pricing", "_blank");
        }
    }
    
    return (
        <div>
        {subscriptionData === "subscription" ? (    // Render content for subscribed users 
            <div className={styles["billing-block-3"]}>
                <div className={styles["plan-container-2"]}>
                    <h1><span className={styles["green"]}>Z</span>ARA <span className={styles["green"]}>GREEN</span></h1>
                    <button onClick={manageAccount()}>Manage Account</button>
                </div>
            </div>
        ) : (                                       // Render content for unsubscribed users 
            <div className={styles["billing-block-2"]}> 
                <div className={styles["plan-container"]}>
                    <h1><span className={styles["green"]}>Z</span>ARA <span className={styles["green"]}>GREEN</span></h1>
                    <h2>Advanced features for a comprehensive and more effective interview preparation experience</h2>
                    <button onClick={pricing()}>See Pricing</button>
                </div>
            </div>
        )}
        </div>
    );
};


    



