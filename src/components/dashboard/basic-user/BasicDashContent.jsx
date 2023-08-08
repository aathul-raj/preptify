import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Start from '../Start'
import BasicAnalytics from './BasicAnalytics'
import { auth } from '../../../back-end/Firebase';

export default function BasicDashContent( {styles} ){
    const [error, setError] = useState("");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const user = auth.currentUser;
    var firstName = user.displayName.split(' ')[0];
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    return <div className={styles["dashboard-content"]}>
        {error && 
                <div className={`${styles["error-popup"]} ${fadeOut ? styles['fade-out'] : ''}`}>
                    <span>{error}</span>
                </div>
        }
        <Header firstName={firstName} styles={styles}/>
        <div className={styles["content-container"]}>
            <Start setError={setError} setFadeOut={setFadeOut} styles={styles}/>
            {screenWidth > 750 ? <BasicAnalytics styles={styles}/> : null}
        </div>
    </div>
}