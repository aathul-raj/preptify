import { useEffect } from "react";
import DashboardImages from '../../constants/DashboardImages'

export default function ZaraStartMain( {setIndex} ){

    useEffect(() => {
        const handleMouseMove = (e) => {
          document.querySelectorAll(".parallax").forEach((move, index) => {
            var movingValue = move.getAttribute("data-value");
            var x = (e.clientX * movingValue) / 250;
            var y = (e.clientY * movingValue) / 250;
            var rotation;

            if (index === 0) {
                rotation = (((e.clientX + e.clientY) * movingValue) / 500); // Offset rotation for the first image
              } else {
                rotation = (((e.clientX + e.clientY) * movingValue) / 500) + 25;
            }
    
            move.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)`;
          });
        };
    
        document.addEventListener("mousemove", handleMouseMove);
    
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
      <div className="start-zara-main">
        <h1 className="zara-heading"><span className="green">Z</span>ARA</h1>
        <div className="blob-container" style={{ position: 'relative', height: '200px', width: '200px' }}>
            <img src={DashboardImages.blob} className="parallax blob" data-value=".5" style={{ position: 'absolute', height: '100%', width: '100%' }}/>
        </div>
        <button
          className="start-button"
          onClick={() => setIndex((prevIndex) => prevIndex + 1)}
          >
          Setup Interview
        </button>
      </div>
    )
}