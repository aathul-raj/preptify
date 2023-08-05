import { Link } from "react-router-dom";
import Footer from "../../components/global/Footer";
import { UserAuth } from "../../context/AuthContext";
import { GoogleButton } from "react-google-button";
import greenLadyImg from "../../img/green-lady.png";
import squiggle3Img from "../../img/squiggle3.png";
import squiggle2Img from "../../img/squiggle2.png";
import EntryImages from "../../constants/EntryImages";
import styles from '../../styles/Login.module.css'

export default function LoginSignup(){
    const { googleSignIn } = UserAuth();

    const handleGoogleSignIn = async () => {
        try {
          await googleSignIn();
        } catch (error) {
          // Error has occurred signing in
        }
      };
      
      return(
        <div className={styles["main-container"]}>
          <div className={styles["header"]}>
            <div className={styles["logo-container"]}>
              <Link to="/">
                <img
                  className={styles["logo-img"]}
                  src={EntryImages.logo}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
    
          <div className={styles["login-container"]}>
            <div className={styles["login-container-left"]}>
              <div className={styles["img-container"]}>
                <img
                  className={styles["squiggle-img-3"]}
                  src={squiggle3Img}
                  alt="squiggle3"
                />
                <img
                  className={styles["green-lady-img"]}
                  src={greenLadyImg}
                  alt="Green Lady"
                />
                <img
                  className={styles["squiggle-img-2"]}
                  src={squiggle2Img}
                  alt="squiggle2"
                />
              </div>
            </div>
            <div className={styles["login-container-right"]}>
              <p className={styles["login-welcome-text"]}>hey there.</p>
    
              <p className={styles["login-prompt-text"]}>login or signup first, before you upgrade</p>
    
              <GoogleButton type="light" onClick={handleGoogleSignIn} />
            </div>
          </div>
          <Footer />
        </div>)
}