import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import HomeImages from '../constants/HomeImages.jsx';
import "../styles/home.css";

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
    <>
      <main>
        <div className="header">
          <div className="logo-container">
            <img className="logo-img" src={HomeImages.logo} alt="logo" />
          </div>
          <div className="auth-buttons-container">
            <button
              onClick={() => navigate("/login")}
              className="log-in-button"
            >
              log in
            </button>
          </div>
        </div>
        <div className="home-container">
          <div className="home-content">
          <img className="statue-img parallax-home" src={HomeImages.statue} alt="Roman Statue" data-value=".4"/>
            <div className="text-container">
              <div className="slogan-container">
                <h1 className="slogan">
                  elevate your <span className="highlight">interview,</span>
                </h1>
                <h1 className="slogan">
                  elevate your career
                </h1>
              </div>
              <h2 className="mission-statement">
                Supercharge your career with Zara, our mock interview AI. Claim
                your first three sessions
                <span className="highlight"> FOR FREE</span> - start today!
              </h2>
              <div className="button-container">
                <button
                  className="get-started-button"
                  onClick={() => navigate("/signup")}
                >
                  get started
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="learn-more-button"
                >
                  pricing
                </button>
              </div>
            </div>
          </div>
          <div className="scroll-down"></div>
        </div>
        
        <div className="learn-more-container">
          <div className="home-block-1">
            <div className="text-container">
              <div className="intro-text">
                empowering careers, one{" "}
                <span className="highlight">interview</span> at a time.
              </div>
              <div className="intro-text-2">
                We help you achieve career excellence through our AI-enhanced
                interview tool, Zara.
              </div>
              <div className="feature-container">
                <img className="icon" src={HomeImages.book}></img>
                <h2 className="feature-text">
                  Streamline your interview preparation with our AI-enhanced
                  interview tool, Zara.
                </h2>
              </div>
              <div className="feature-container">
                <img className="icon" src={HomeImages.speech}></img>
                <h2 className="feature-text">
                  Gain the skills and confidence you need to excel in your
                  career.
                </h2>
              </div>
              <div className="feature-container">
                <img className="icon" src={HomeImages.check}></img>
                <h2 className="feature-text">
                  Unlock your potential through personalized interview guidance
                  and support
                </h2>
              </div>
            </div>
            <img className="learn-more-ai-img" src={HomeImages.careers} alt="AI" />
          </div>
          <div className="home-block-2">
            <img className="features-img" src={HomeImages.features} alt="AI" />

            <div className="text-container">
              <div className="intro-text">
                our
                <span className="highlight"> features</span>.
              </div>
              <div className="intro-text-2">
                Discover a trove of innovative features meticulously crafted to
                catapult you towards acing your impending job interview.
              </div>

              <div className="feature-container">
                <img className="icon" src={HomeImages.clock}></img>
                <h2 className="feature-text">
                  Zara creates authentic interview scenarios, allowing users to
                  practice and refined answers.
                </h2>
              </div>
              <div className="feature-container">
                <img className="icon" src={HomeImages.idea}></img>
                <h2 className="feature-text">
                  By analyzing user responses, we provide detailed feedback at
                  the end of every interview.
                </h2>
              </div>
              <div className="feature-container">
                <img className="icon" src={HomeImages.shield}></img>

                <h2 className="feature-text">
                  Preptify offers a safe environment to practice, helping users
                  overcome anxiety and develop interview skills for optimal
                  performance.
                </h2>
              </div>
            </div>
          </div>

          <div className="home-block-3">
            <div className="step-container">
              <h1 className="intro-text text-bottom">
                Take the first step towards interview success and{" "}
                <span className="highlight">unlock</span> your career potential
                with Zara <span className="highlight">today</span>.
              </h1>
              <img
                className="squiggle-img"
                src={HomeImages.squiggle}
                alt="Squiggle"
              ></img>
              <div>
                <button
                  className="get-started-button"
                  onClick={() => navigate("/signup")}
                >
                  get started
                </button>
                <button
                  className="learn-more-button"
                >
                  pricing
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <button> people </button>
          <button> faq </button>
          <button> contact </button>
        </div>
      </main>
    </>
  );
}

export default Home;
