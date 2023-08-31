import React from "react";
import styles from "../../styles/global/Footer.module.css";
import logoImg from "../../img/preptify_cropped.png";
import instaIcon from "../../img/icons/instagram.png";
import linkedinIcon from "../../img/icons/linkedin.png";
// import threadsIcon from "../../img/icons/threads.png";
import tikTokIcon from "../../img/icons/tik-tok.png";
import twitterIcon from "../../img/icons/twitter.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  let navigate = useNavigate()
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-top-container"]}>
        <div className={styles["left-container"]}>
          <img src={logoImg} className={styles["footer-logo"]} onClick={() => {
            navigate('/')
            window.scrollTo(0, 0);
          }}></img>

          <div className={styles["social-icon-container"]}>
            <a
              href="https://twitter.com/preptifyco"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} className={styles["footer-icon"]}></img>
            </a>
            <a
              href="https://www.tiktok.com/@preptify"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tikTokIcon} className={styles["footer-icon"]}></img>
            </a>
            <a
              href="https://www.linkedin.com/company/preptify/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} className={styles["footer-icon"]}></img>
            </a>
            <a
              href="https://www.instagram.com/preptifyco/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instaIcon} className={styles["footer-icon"]}></img>
            </a>
            {/* no threads webapp yet  */}
            {/* <a
              href="add link here"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={threadsIcon} className="threads-icon"></img>
            </a> */}
          </div>
        </div>
        <div className={styles["right-container"]}>
          <div className={styles["company-container"]}>
            <h1 className={styles["header-text"]}>Company</h1>
            <h2 className={styles["sub-text"]} onClick={() => {
              navigate('/about')
              window.scrollTo(0, 0);
            }}>About Us</h2>
            {/* <h2 className="sub-text">Our Offerings</h2> */}
          </div>
          <div className={styles["products-container"]}>
            <h1 className={styles["header-text"]}>Products</h1>
            <h2 className={styles["sub-text"]} onClick={() => navigate('/pricing')}>Zara</h2>
          </div>
        </div>
      </div>

      <div className={styles["footer-bottom-container"]}>
        <p>© {new Date().getFullYear()} Preptify Technologies Inc.</p>
        <div className={styles["contact-terms-container"]}>
          <a href="mailto:preptifyco@gmail.com" target="blank">
            <h1 className={styles["contact-button"]}>Contact</h1>
          </a>
          <h1 className={styles["terms-button"]} onClick={() => {
            navigate('/terms')
            window.scrollTo(0, 0);
          }}>Terms</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
