import MainHeader from "../components/global/MainHeader.jsx";
import Footer from "../components/global/Footer.jsx";
import styles from "../styles/views/NotFound.module.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const contactLink = () => {
    window.location = "mailto:preptifyco@gmail.com"
  }
  return (
    <>
      <main>
        <MainHeader />
        <div className={styles["main-container"]}>
          <div className={styles["left-block"]}>
            <div className={styles["body"]}>something's <br/> missing.</div>
            <button 
            onClick={() => navigate("/")}
            className={styles["button1"]}> go home
            </button>

            <button 
            onClick={contactLink}
            className={styles["button2"]}>
              contact us
            </button>
          </div>
          <div className={styles["right-block"]}>
            <h2 className={styles["notfound-text"]}>404</h2>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
export default NotFound;
