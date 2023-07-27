import React from "react";
import "../../styles/Footer.css";
import logoImg from "../../img/preptify_cropped.png";
import instaIcon from "../../img/icons/instagram.png";
import linkedinIcon from "../../img/icons/linkedin.png";
import threadsIcon from "../../img/icons/threads.png";
import tikTokIcon from "../../img/icons/tik-tok.png";
import twitterIcon from "../../img/icons/twitter.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top-container">
        <div className="left-container">
          <img src={logoImg} className="footer-logo"></img>

          <div className="social-icon-container">
            <a
              href="https://twitter.com/preptifyco"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} className="footer-icon"></img>
            </a>
            <a
              href="https://www.tiktok.com/@preptify"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tikTokIcon} className="footer-icon"></img>
            </a>
            <a
              href="https://www.linkedin.com/company/preptify/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} className="footer-icon"></img>
            </a>
            <a
              href="https://www.instagram.com/preptifyco/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instaIcon} className="footer-icon"></img>
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
        <div className="right-container">
          <div className="company-container">
            <h1 className="header-text">Company</h1>
            <h2 className="sub-text">About Us</h2>
            <h2 className="sub-text">Our Offerings</h2>
          </div>
          <div className="products-container">
            <h1 className="header-text">Products</h1>
            <h2 className="sub-text">Zara</h2>
          </div>
        </div>
      </div>

      <div className="footer-bottom-container">
        <p>© {new Date().getFullYear()} Preptify Technologies Inc.</p>
        <div className="contact-terms-container">
          <a href="mailto:preptifyco@gmail.com" target="blank">
            <h1 className="contact-button">Contact</h1>
          </a>
          <h1 className="terms-button">Terms</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
