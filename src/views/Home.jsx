import { useNavigate } from "react-router-dom";
import AIImage from "../img/preptify-ai.png";
import "../styles/home.css";
import Logo from "../img/preptify_cropped.png";

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
                onClick={() => navigate("/learn-more")}
                className="learn-more-button"
              >
                learn more
              </button>
            </div>
          </div>

          <img className="ai-img" src={AIImage} alt="AI" />
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
