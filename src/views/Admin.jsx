import React, { useEffect, useState } from 'react';
import { auth } from '../back-end/Firebase';
import { getFirestore, collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Admin.module.css';

export default function Admin() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPaidUsers: 0,
        totalInterviewsCompleted: 0
    });

    useEffect(() => {
        // Monitor user authentication state
        const unsubscribeAuth = auth.onAuthStateChanged(async user => {
            if (!user) {
                // User is not logged in
                navigate('/login');
            } else {
                // Get Firestore reference
                const db = getFirestore();
                const userRef = doc(db, 'users', user.uid);

                // Fetch the document for the user
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    // Check if user has the admin field set to true
                    if (userData.admin) {
                        // Stay on the Admin page
                    } else {
                        // Redirect to dashboard
                        navigate('/dashboard');
                    }
                } else {
                    console.error("Error: User document doesn't exist in Firestore.");
                    navigate('/dashboard'); // Or handle this error in some other way
                }
            }
        });

        const db = getFirestore();
        const usersRef = collection(db, 'users');

        const unsubscribeFirestore = onSnapshot(usersRef, snapshot => {
            let totalUsers = 0;
            let totalPaidUsers = 0;
            let totalInterviewsCompleted = 0;

            snapshot.forEach(doc => {
                const userData = doc.data();

                totalUsers++;

                if (userData.subscription == 'zara green') {
                    totalPaidUsers++;
                }

                if (userData.interviewsCompleted) {
                    totalInterviewsCompleted += userData.interviewsCompleted;
                }
            });

            setStats({
                totalUsers,
                totalPaidUsers,
                totalInterviewsCompleted
            });
        });

        // Cleanup the auth and Firestore listeners on unmount
        return () => {
            unsubscribeAuth();
            unsubscribeFirestore();
        };
    }, [navigate]);

    return (
        <div className={styles['admin-container']}>
            <h1 className={styles['admin-title']}>ADMIN DASHBOARD</h1>
            <div className={styles['stats-container']}>
                <p><strong>Total Users:</strong> {stats.totalUsers}</p>
                <p><strong>Total Paid Users:</strong> {stats.totalPaidUsers}</p>
                <p><strong>Total Interviews Completed:</strong> {stats.totalInterviewsCompleted}</p>
            </div>
        </div>
    );
}
