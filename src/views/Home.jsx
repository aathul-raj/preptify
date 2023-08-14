import React, { useEffect } from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/global/MainHeader.jsx";
import Faq from "../components/Faq.jsx";
import Footer from "../components/global/Footer.jsx";
import HomeImages from "../constants/HomeImages.jsx";
import styles from "../styles/Home.module.css";

function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.querySelectorAll(".parallax-home").forEach((move, index) => {
        var movingValue = move.getAttribute("data-value");
        var x = (e.clientX * movingValue) / 250;
        var y = (e.clientY * movingValue) / 250;
        var rotation;

        if (index === 0) {
          rotation = ((e.clientX + e.clientY) * movingValue) / 500; // Offset rotation for the first image
        } else {
          rotation = ((e.clientX + e.clientY) * movingValue) / 500 + 25;
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
    <>
      <main>
        <MainHeader/>
        <div className={styles["home-container"]}>
          <div className={styles["home-content"]}>
            <img
              className={`${styles["statue-img"]} ${styles["parallax-home"]}`}
              src={HomeImages.statue}
              alt="Roman Statue"
              data-value=".4"
            />
            <div className={styles["text-container"]}>
              <div className={styles["slogan-container"]}>
                <h1 className={styles["slogan"]}>
                  elevate your <span className={styles["highlight"]}>interview,</span>
                </h1>
                <h1 className={styles["slogan"]}>elevate your career</h1>
              </div>
              <h2 className={styles["mission-statement"]}>
                Supercharge your career with Zara, our mock interview AI. Join
                our closed beta
                <span className={styles["highlight"]}> FOR FREE</span> - start today!
              </h2>
              <div className={styles["button-container"]}>
                <button
                  className={styles["get-started-button"]}
                  onClick={() => navigate("/login")}
                >
                  get started
                </button>
                {/* <button
                  onClick={() => navigate("/pricing")}
                  className={styles["learn-more-button"]}
                >
                  pricing
                </button> */}
              </div>
            </div>
          </div>
          <div className={styles["scroll-down"]}></div>
        </div>

        <div className={styles["learn-more-container"]}>
          <div className={styles["home-block-1"]}>
            <div className={styles["text-container"]}>
              <div className={styles["intro-text"]}>
                empowering careers, one{" "}
                <span className={styles["highlight"]}>interview</span> at a time
              </div>
              <div className={styles["intro-text-2"]}>
              we believe everyone deserves a successful career 
              - enter <span className={styles["highlight"]}>z</span>ara, our first step in this mission
              </div>
            </div>
            <img
              className={styles["learn-more-ai-img"]}
              src={HomeImages.careers}
              alt="AI"
            />
          </div>
          <div className={styles["home-block-2"]}>
            <img className={styles["features-img"]} src={HomeImages.features} alt="AI" />

            <div className={styles["text-container"]}>
              <div className={styles["intro-text"]}>
                our
                <span className={styles["highlight"]}> features</span>
              </div>
              
              <div className={styles["feature-container"]}>
                <img className={styles["icon"]} src={HomeImages.clock}></img>
                <h2 className={styles["feature-text"]}>
                  Immerse yourself in authentic interview scenarios, allowing you to
                  practice and refine answers
                </h2>
              </div>
              <div className={styles["feature-container"]}>
                <img className={styles["icon"]} src={HomeImages.idea}></img>
                <h2 className={styles["feature-text"]}>
                  By analyzing responses, zara provides detailed feedback at
                  the end of every interview and tracks your progress over time
                </h2>
              </div>
              <div className={styles["feature-container"]}>
                <img className={styles["icon"]} src={HomeImages.shield}></img>

                <h2 className={styles["feature-text"]}>
                  Zara offers a safe environment to practice, helping you
                  overcome anxiety and achieve peak performance
                </h2>
              </div>
            </div>
          </div>
          <Faq styles={styles}/>

          <div className={styles["home-block-3"]}>
            <div className={styles["step-container"]}>
              <h1 className={styles["intro-text text-bottom"]}>
                take the first step towards interview success and{" "}
                <span className={styles["highlight"]}>unlock</span> your career potential
                with Zara <span className={styles["highlight"]}>today</span>.
              </h1>
              <img
                className={styles["squiggle-img"]}
                src={HomeImages.squiggle}
                alt="Squiggle"
              ></img>
              <div>
                <button
                  className={`${styles["white-get-started"]}`}
                  onClick={() => {
                    navigate('/login')
                    window.scrollTo(0, 0);
                  }}
                >
                  get started
                </button>
                <button className={styles["learn-more-button"]} onClick={() => {
                  navigate('/pricing')
                  window.scrollTo(0, 0);
                }}>pricing</button>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </main>
    </>
  );
}
export default Home;
