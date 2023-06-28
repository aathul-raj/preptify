import Header from './Header'
import Start from './Start'
import Analytics from './Analytics'
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from 'react'

export default function DashboardContent(){
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const auth = getAuth();
    const user = auth.currentUser;
    var firstName = user.displayName.split(' ')[0];
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    console.log(user)

    if(user != null){
        console.log(user.email);
    } else{
        console.log('not logged in')
    }

    useEffect(() => {
        const handleResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div className="dashboard-content">
        <Header firstName={firstName}/>
        <div className="content-container">
            <Start/>
            {screenWidth > 750 ? <Analytics/> : null}
        </div>
    </div>
}