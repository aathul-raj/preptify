import { useNavigate } from "react-router-dom";
import AIImage from "../img/preptify-ai.png";
import "../styles/home.css";
import Logo from "../img/preptify_cropped.png";
import "../styles/learn-more.css";
import SkillsImg from "../img/skills.png";
import DumbellImg from "../img/dumbbell.png";
import PuzzleImg from "../img/puzzle.png";
import ConfidenceImg from "../img/confidence.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import StatueImg from "../img/roman-statue.png";
import CareersImg from "../img/careers.png";
import FeaturesImg from "../img/features.png";
import SquiggleImg from "../img/squiggle.png";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <div className="header">
          <div className="logo-container">
            <img className="logo-img" src={Logo} alt="logo" />
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
          <img className="statue-img" src={StatueImg} alt="Roman Statue" />

          <div className="text-container">
            <h1 className="slogan">
              elevate your <span className="highlight">interview</span>, elevate
              your career.
            </h1>
            <h2 className="mission-statement">
              Supercharge your career with Zara, our mock interview AI. Claim
              your first three sessions{" "}
              <span className="highlight">FOR FREE</span> - start today!
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
                {/* <img className="icon" src={CareersImg}></img> */}
                <h2 className="feature-text">
                  Streamline your interview preparation with our AI-enhanced
                  interview tool, Zara.
                </h2>
              </div>
              <div className="feature-container">
                {/* <img className="icon" src={ChatIconImg}></img> */}
                <h2 className="feature-text">
                  Gain the skills and confidence you need to excel in your
                  career.
                </h2>
              </div>
              <div className="feature-container">
                {/* <img className="icon" src={ImagineIconImg}></img> */}
                <h2 className="feature-text">
                  Unlock your potential through personalized interview guidance
                  and support
                </h2>
              </div>
            </div>
            <img className="learn-more-ai-img" src={CareersImg} alt="AI" />
          </div>
          <div className="home-block-2">
            <img className="features-img" src={FeaturesImg} alt="AI" />

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
                {/* <img className="icon" src={ImgIconImg}></img> */}
                <h2 className="feature-text">
                  Zara creates authentic interview scenarios, allowing users to
                  practice and refined answers.
                </h2>
              </div>
              <div className="feature-container">
                {/* <img className="icon" src={ChatIconImg}></img> */}
                <h2 className="feature-text">
                  By analyzing user responses, we provide detailed feedback at
                  the end of every interview.
                </h2>
              </div>
              <div className="feature-container">
                {/* <img className="icon" src={ImagineIconImg}></img> */}

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
              <h1 className="intro-text">
                Take the first step towards interview success and{" "}
                <span className="highlight">unlock</span> your career potential
                with Zara <span className="highlight">today</span>.
              </h1>
              <img
                className="squiggle-img"
                src={SquiggleImg}
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
                  onClick={() => navigate("/pricing")}
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
