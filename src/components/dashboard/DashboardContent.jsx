import Header from './Header'
import Start from './Start'
import Analytics from './Analytics'
import React, { useEffect, useState } from 'react'

export default function DashboardContent(){
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

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
        <Header/>
        <div className="content-container">
            <Start/>
            {screenWidth > 750 ? <Analytics/> : null}
        </div>
    </div>
}