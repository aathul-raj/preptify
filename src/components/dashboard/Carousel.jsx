import React, { useState, useEffect } from "react";

export default function Carousel( {feedback} ){
    const [currentScreen, setCurrentScreen] = useState(0);
    const screens = feedback;

    const handleClick = (index) => {
        setCurrentScreen(index);
    }

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentScreen((currentScreen + 1) % screens.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [currentScreen]);

    let color = 'negative'
    
    return (
        <div className="carousel">
            <div className="carousel-screens">
            {screens[currentScreen]}
            </div>
            <div className="carousel-indicators">
            {screens.map((_, index) => {
                if (index == screens.length - 1){
                    color = 'positive'
                }

                return (
                    <div 
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`carousel-indicator ${index === currentScreen ? 'active' : ''} ${color}`}
                    />
                )
            })}
            </div>
        </div>
    )
}