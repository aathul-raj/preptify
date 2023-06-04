import React from 'react';
import "../styles/Preloader.css";

const LoadingAnimation = () => {
    let dots = [];

    for (let x = 0; x < 16; x++) {
        let delay = '0s';
        if (x % 4 === 1) delay = '.1s';
        else if (x % 4 === 2) delay = '.2s';
        else if (x % 4 === 3) delay = '.3s';
        else if (x % 4 === 0 && x !== 0 && x !== 15) delay = '.4s';
        if (x === 11 || x === 14) delay = '.5s';
        if (x === 15) delay = '.6s';

        dots.push(<div style={{animationDelay: delay}} key={x} />);
    }

    return <div className="loading">{dots}</div>
};

export default LoadingAnimation;