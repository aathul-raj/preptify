import React, { useEffect, useState } from 'react'
import Header from './Header'
import Start from './Start'
import Analytics from './Analytics'
import { auth } from '../../back-end/firebase';

export default function DashboardContent(){
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

    return <div className="dashboard-content">
        {error && 
                <div className={`error-popup ${fadeOut ? 'fade-out' : ''}`}>
                    <span>{error}</span>
                </div>
        }
        <Header firstName={firstName}/>
        <div className="content-container">
            <Start setError={setError} setFadeOut={setFadeOut}/>
            {screenWidth > 750 ? <Analytics/> : null}
        </div>
    </div>
}