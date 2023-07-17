import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Header from './Header'
import Start from './Start'
import { auth } from '../../back-end/Firebase'
import DashboardImages from '../../constants/DashboardImages'
import ToggleSetting from './ToggleSetting'
import { doc, updateDoc, getDoc, increment, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import '../../styles/Settings.css'

export default function Setting(){
    let navigate = useNavigate()
    const db = getFirestore()
    const auth = getAuth()
    const currentUser = auth.currentUser
    const userRef = doc(db, 'users', currentUser.uid);

    return <div className="settings-content">
        <div className="header">
                <div className="welcome-text">
                    <h2>Settings</h2>
                    <h1>Customize your Interview Experience with Zara</h1>
                </div>
                <img src={DashboardImages.bird} alt="Logo" onClick={() => navigate('/')} className="bird-logo"/>
        </div>
            <div className="email-container">
                <div className="email-block-1">
                    <h1>Email Notifications</h1>
                    <h2>Control how you receive email updates and reminders from Preptify</h2>
                </div>
                <div className="email-block-2">
                    <ToggleSetting heading="News and Updates" subheading="News about product features and updates" userRef={userRef} id="news"/>
                    <ToggleSetting heading="Tips and tutorials" subheading="Tips on getting more out of Zara" userRef={userRef} id="tips"/>
                </div>
                <div className="email-block-3">
                    <ToggleSetting heading="Promotions and Offers" subheading="Information on any special offers, discounts, or promotions" userRef={userRef} id="promos"/>
                </div>
            </div>
            <div className="billing-container">
                <div className="billing-block-1">
                    <h1>Billing</h1>
                    <h2>Manage your payment methods, subscription, and billing preferences</h2>
                </div>
                <div className="billing-block-2">
                    <div className="plan-container">
                        <h3>Upgrade Plan</h3>
                        <h1><span className="green">Z</span>ARA <span className="green">PRO</span></h1>
                        <h2>Advanced features for a comprehensive and more effective interview preparation experience</h2>
                        <button>Coming Soon</button>
                    </div>
                </div>
            </div>
    </div>
}