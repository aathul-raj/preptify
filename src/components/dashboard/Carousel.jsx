import React, { useState, useEffect } from "react";

export default function Carousel( {feedback, styles} ){
    const [currentScreen, setCurrentScreen] = useState(0);
    const screens = feedback;
    let color = 'negative'
    
    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentScreen((currentScreen + 1) % screens.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [currentScreen]);

    const handleClick = (index) => {
        setCurrentScreen(index);
    }
    
    return (
        <div className={styles["carousel"]}>
            <div className={styles["carousel-screens"]}>
            {screens[currentScreen]}
            </div>
            <div className={styles["carousel-indicators"]}>
            {screens.map((_, index) => {
                if (index == screens.length - 1){
                    color = 'positive'
                }

                return (
                    <div 
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`${styles["carousel-indicator"]} ${index === currentScreen ? styles['active'] : ''} ${styles[color]}`}
                    />
                )
            })}
            </div>
        </div>
    )
}