import "../styles/learn-more.css";
import AIImage from "../img/preptify-ai.png";
import SkillsImg from "../img/skills.png";
import DumbellImg from "../img/dumbbell.png";
import Logo from "../img/preptify_cropped.png";
import PuzzleImg from "../img/puzzle.png";
import ConfidenceImg from "../img/confidence.png";
import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

function LearnMore() {
  const navigate = useNavigate();

  useEffect(() => {
    const arrow1 = document.getElementById("down-arrow-1");
    const checkScroll1 = () => {
      let opacity = 1 - window.scrollY / 500; // Adjust 200 to whatever suits you
      arrow1.style.opacity = opacity > 0 ? opacity : 0;
    };
    window.addEventListener("scroll", checkScroll1);
    return () => {
      window.removeEventListener("scroll", checkScroll1);
    };
  }, []);

  useLayoutEffect(() => {
    const arrow2 = document.getElementById("down-arrow-2");

    if (arrow2) {
      const checkScroll2 = () => {
        const arrow2Position = arrow2.getBoundingClientRect().bottom;
        let opacity = 1;

        if (arrow2Position < window.innerHeight) {
          opacity = arrow2Position / window.innerHeight;
        }

        arrow2.style.opacity = opacity > 0 ? opacity : 0;
      };

      window.addEventListener("scroll", checkScroll2);

      return () => {
        window.removeEventListener("scroll", checkScroll2);
      };
    }
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img className="logo-img" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="auth-buttons-container">
          <div className="learn-more-button-container">
            <button className="get-started" onClick={() => navigate("/signup")}>
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="header"></div>
      <div className="learn-more-container">
        <div className="block-1">
          <img className="learn-more-ai-img" src={AIImage} alt="AI" />
          <div className="block-1-content">
            <h1>
              empowering careers, <br /> one{" "}
              <span className="highlight">interview</span> at a time.
            </h1>
            <h2>
              At Preptify, our mission is to provide individuals with the tools
              and resources they need to excel in their careers. Through our
              AI-powered mock interviews and personalized feedback, we aim to
              empower individuals to confidently navigate the interview process
              and achieve professional success.
            </h2>
          </div>
          <div className="scroll-arrow" id="down-arrow-1"></div>
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
              anxiety. Preptify, our innovative career prep startup, provides a
              comprehensive solution to address these pressing issues.
            </h2>
          </div>
          <img className="puzzle-img" src={PuzzleImg} alt="Problem" />
          <div className="scroll-arrow" id="down-arrow-2"></div>
        </div>

        <div className="block-3">
          <h1>
            how we <span className="highlight">solve</span> it.
          </h1>
          <div className="solution-container">
            <div className="solution-block">
              <img className="solutions-img" src={DumbellImg} alt="Skills" />

              <h1>
                <span className="highlight">realistic</span> practice
              </h1>
              <h2>
                Zara creates authentic interview scenarios, allowing users to
                practice, refine answers, and gain confidence.
              </h2>
            </div>
            <div className="solution-block">
              <img className="solutions-img" src={SkillsImg} alt="Skills" />

              <h1>
                <span className="highlight">personalized</span> feedback
              </h1>
              <h2>
                Our AI Zara analyzes user responses, providing detailed feedback
                to enhance interview skills.
              </h2>
            </div>
            <div className="solution-block">
              <img className="solutions-img" src={ConfidenceImg} alt="Skills" />

              <h1>
                <span className="highlight">confidence</span> building
              </h1>
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
    </>
  );
}

export default LearnMore;
