import React from 'react'
import { useNavigate } from "react-router-dom";
import DashboardImages from '../../../constants/DashboardImages'
import ToggleSetting from './ToggleSetting'
import { doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from "../../../styles/settings/Settings.module.css"
import dashboardStyles from "../../../styles/views/Dashboard.module.css"
import SettingsZaraGreen from "./SettingsZaraGreen"

export default function Setting({subscriptionStatus}){
    let navigate = useNavigate()
    const db = getFirestore()
    const auth = getAuth()
    const currentUser = auth.currentUser
    const userRef = doc(db, 'users', currentUser.uid);

    return (
        <div className={dashboardStyles["settings-content"]}>
            <div className={styles["header"]}>
                <div className={styles["welcome-text"]}>
                    <h2>Settings</h2>
                    <h1>Customize your Interview Experience with Zara</h1>
                </div>
                <img src={DashboardImages.bird} alt="Logo" onClick={() => navigate('/')} className={styles["bird-logo"]}/>
            </div>
            <div className={styles["email-container"]}>
                <div className={styles["email-block-1"]}>
                    <h1>Email Notifications</h1>
                    <h2>Control how you receive email updates and reminders from Preptify</h2>
                </div>
                <div className={styles["email-block-2"]}>
                    <ToggleSetting heading="News and Updates" subheading="News about product features and updates" userRef={userRef} id="news"/>
                    <ToggleSetting heading="Tips and tutorials" subheading="Tips on getting more out of Zara" userRef={userRef} id="tips"/>
                </div>
                <div className={styles["email-block-3"]}>
                    <ToggleSetting heading="Promotions and Offers" subheading="Information on any special offers, discounts, or promotions" userRef={userRef} id="promos"/>
                </div>
            </div>
            <SettingsZaraGreen subscriptionStatus={subscriptionStatus}/>
        </div>
    );
}