import React, { useEffect } from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/global/MainHeader.jsx";
import Footer from "../components/global/Footer.jsx";
import HomeImages from "../constants/HomeImages.jsx";
import styles from "../styles/Home.module.css";

function Home() {

const[selected, setSelected] = useState(null)

  const toggle = (i) => {
    console.log(selected)
    if(selected === i){
      return setSelected(null)
    }

    setSelected(i)
  }



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
                  onClick={() => navigate("/signup")}
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
              <div className={styles["feature-container"]}>
                <img className={styles["icon"]} src={HomeImages.book}></img>
                <h2 className={styles["feature-text"]}>
                  Streamline your interview preparation with our all in one platform
                </h2>
              </div>
              <div className={styles["feature-container"]}>
                <img className={styles["icon"]} src={HomeImages.speech}></img>
                <h2 className={styles["feature-text"]}>
                  Gain the skills and confidence you need to excel in your
                  career
                </h2>
              </div>
              <div className={styles["feature-container"]}>
                <img className={styles["icon"]} src={HomeImages.check}></img>
                <h2 className={styles["feature-text"]}>
                  Unlock your potential through personalized interview guidance
                  and support
                </h2>
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
              <div className={styles["intro-text-2"]}>
                <span className={styles["highlight"]}>z</span>ara is loaded with features and crafted to ensure that you'll ace your impending interviews
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
          <div className={styles["home-block-4"]}>
            <img
                  className={styles["faq-squiggle"]}
                  src={HomeImages.squiggle}
                  alt="Squiggle"
                >
            </img>
            <img
                  className={styles["faq-arrow-squiggle"]}
                  src={HomeImages.arrow_squiggle}
                  alt="Arrow-squiggle"
                >
            </img>
            <h1 className={styles["faq"]}>
            frequently asked <span className={styles["faq-highlight"]}>questions.</span>
              <h2 className={styles['faq-sub']}>things that are commonly asked.</h2>
            </h1>
              <div className={styles["accordian"]}>
                {promptAnswer.map((item, i) => (
                    <div className={selected === i ? styles['item-show'] : styles['item']}>
                      <div className={selected === i ? styles['title-show'] : styles['title']} onClick={() => toggle(i)}>
                        <img
                              className={styles["faq-arrow"]}
                              src={selected === i ? HomeImages.faq_up_arrow : HomeImages.faq_down_arrow}
                              alt="faq_up_arrow"
                            >
                        </img>
                        
                        <h2 className={styles['prompt']}>{item.prompt}</h2>
                      </div>
                      <div className={selected === i ? styles['content-show'] : styles['content']}>
                          {item.answer}
                      </div>
                    </div>
                  ))}
              </div>
          </div>

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
                    navigate('/signup')
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


const promptAnswer = [
  {
    prompt: 'what do we do?',
    answer: 'We work hard'
  },
  {
    prompt: 'getting started with Zara',
    answer: 'We make dreams come true'
  },
  {
    prompt: 'what do we do?',
    answer: 'We make saharsh proud'
  },
  {
    prompt: 'is there a free trial?',
    answer: 'We got a gyatt'
  },
  {
    prompt: 'what is your cancellation policy?',
    answer: 'We are them'
  },
  {
    prompt: 'can I use Zara if I\'m a Med student?',
    answer: 'nah pham'
  },
  {
    prompt: 'what\'s in the future for Zara?',
    answer: 'lots more'
  },
]
export default Home;
