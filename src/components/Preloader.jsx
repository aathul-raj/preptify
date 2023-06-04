import React, { useRef, useEffect } from 'react';
import "../styles/Preloader.css";

export default function Preloader(){
    const canvasRef = useRef(null);

    // useEffect(() => {
    //     let canvas = canvasRef.current;
    //     let ctx = canvas.getContext('2d');
    //     let j = 0, pixSize = 2, pixCount = 50;

    //     const interval = setInterval(() => {
    //         // Clear the canvas before each new drawing
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         j = 0;
    //         for (let r = 0; r < pixCount; r++){
    //             for(var i = 0; i < pixCount; i++){
    //                 if (i % pixCount === 0) {
    //                     j++
    //                 }

    //                 ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    //                 ctx.fillRect(i * pixSize, j * pixSize, 20, 20);
    //             }
    //         }
    //     }, 150);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="drawing_container">
            <canvas ref={canvasRef} className="canvas"></canvas>
        </div>
    );
}
