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
          <div className="text-container">
            <h1 className="slogan">
              elevate your <span className="highlight">interview</span>, elevate
              your career.
            </h1>
            <h2 className="mission-statement">
              experience personalized, ai-powered interview preparation designed
              to hone your skills, boost your confidence, and propel your career
              to new heights.
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

          <img className="ai-img" src={AIImage} alt="AI" />
        </div>
        <div className="learn-more-container">
          <div className="block-1">
            <img className="learn-more-ai-img" src={AIImage} alt="AI" />
            <div className="block-1-content">
              <h1>
                empowering careers, <br /> one{" "}
                <span className="highlight">interview</span> at a time.
              </h1>
              <h2>
                At Preptify, our mission is to provide individuals with the
                tools and resources they need to excel in their careers. Through
                our AI-powered mock interviews and personalized feedback, we aim
                to empower individuals to confidently navigate the interview
                process and achieve professional success.
              </h2>
            </div>
          </div>
          <div className="block-2">
            <div className="block-2-content">
              <h1>
                the <span className="highlight">problem</span> we face.
              </h1>
              <h2>
                Many individuals face significant challenges when preparing for
                job interviews: limited realistic practice opportunities,
                inadequate feedback and guidance, and confidence and performance
                anxiety. Preptify, our innovative career prep startup, provides
                a comprehensive solution to address these pressing issues.
              </h2>
            </div>
            <img className="puzzle-img" src={PuzzleImg} alt="Problem" />
          </div>

          <div className="block-3">
            <h1>
              how we <span className="highlight">solve</span> it.
            </h1>
            <div className="solution-container">
              <div className="solution-block">
                <img className="solutions-img" src={DumbellImg} alt="Skills" />

                <h3>
                  <span className="highlight">realistic</span> practice
                </h3>
                <h2>
                  Zara creates authentic interview scenarios, allowing users to
                  practice, refine answers, and gain confidence.
                </h2>
              </div>
              <div className="solution-block">
                <img className="solutions-img" src={SkillsImg} alt="Skills" />

                <h3>
                  <span className="highlight">personalized</span> feedback
                </h3>
                <h2>
                  Our AI Zara analyzes user responses, providing detailed
                  feedback to enhance interview skills.
                </h2>
              </div>
              <div className="solution-block">
                <img
                  className="solutions-img"
                  src={ConfidenceImg}
                  alt="Skills"
                />

                <h3>
                  <span className="highlight">confidence</span> building
                </h3>
                <h2>
                  Preptify offers a safe environment to practice, helping users
                  overcome anxiety and develop interview skills for optimal
                  performance.
                </h2>
              </div>
            </div>
          </div>
          <div className="learn-more-button-container">
            <button className="get-started" onClick={() => navigate("/signup")}>
              Get Started
            </button>
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
