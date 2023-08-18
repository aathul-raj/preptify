import React, { useEffect } from "react";
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import EntryImages from "../constants/EntryImages";
import Form from "../components/Form";
import styles from "../styles/Resume.module.css";
import Popup from "../components/ResumePopup"

function Resume() {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  return (
    <>
      <main>
        {/* popup accepting .pdf input for resume uploads */}
        {isPopupOpen && <Popup onClose={closePopup} />}
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
        <div className={styles["home-container"]}>
          <div className={styles["txt-container"]}>
            <div>
            <h1 className={styles["txt"]}>
            check your <span className={styles["highlight"]}>resume</span>
            </h1>
          </div>
            <h2 className={styles["tutorial-text"]}>
              edit anything that looks off. if everything looks good, submit it!</h2>
            </div>
        </div>

          <div className={styles["form-container"]}>
            <div className={styles["form-section-personal"]}>
              <div>
              <h2 className={styles["form-header"]}> personal </h2>
              <h2 className={styles["form-data"]}> name </h2>
              <Form size="300px" height="44px" placeholder="First" />
              <Form size="300px" height="44px" placeholder="Last" />
              <h2 className={styles["form-data"]}> email </h2>
              <Form size="625px" height="44px" placeholder="example@gmail.com" />
              </div>
              <div className={styles["form-section-description"]}>
                <h2 className={styles["form-data"]}> description </h2>
                  <Form size="625px" height="174px" multiline placeholder="detail oriented individual who..." />
              </div>
            </div>

            <div className={styles["form-section-education"]}>
              <div>
                <h2 className={styles["form-header"]}> education </h2>
                <h2 className={styles["form-data"]}> school </h2>
                <Form size="625px" height="44px" placeholder="school name" />
                <h2 className={styles["form-data"]}> major </h2>
                <Form size="625px" height="44px" placeholder="ba in computer science, ba in data science, etc." />
              </div>
              <div className={styles["form-section-description"]}>
                <h2 className={styles["form-data"]}> expected graduation </h2>
                <Form size="625px" height="44px" placeholder="MM/YY, or 'graduated'" />
              </div>
            </div>

            <div className={styles["form-section-work"]}>
              
              <div>
              <h2 className={styles["form-header"]}> work experience </h2>
              <h2 className={styles["form-data"]}> employer <span className={styles["highlight"]}> #1 </span> </h2>
              <Form size="300px" height="44px" placeholder="company name" />
              <h2 className={styles["form-data"]}> job title </h2>
              <Form size="625px" height="44px" placeholder="entry level engineer" />
              <h2 className={styles["form-data"]}> from </h2>
              <Form size="625px" height="44px" placeholder="January 2020 - Present" />
              </div>
              <div className={styles["form-section-description"]}>
                <h2 className={styles["form-data"]}> description </h2>
                  <Form size="625px" height="303px" multiline placeholder="developed an internal api, worked with a team of 5..." />
              </div>
            </div>

            <div className={styles["form-section-work"]}>
              
              <div>
                <h2 className={styles["form-data"]}> employer <span className={styles["highlight"]}> #2 </span> </h2>
                <Form size="300px" height="44px" placeholder="company name" />
                <h2 className={styles["form-data"]}> job title </h2>
                <Form size="625px" height="44px" placeholder="entry level engineer" />
                <h2 className={styles["form-data"]}> from </h2>
                <Form size="625px" height="44px" placeholder="January 2020 - Present" />
              </div>
              <div className={styles["form-section-description-2"]}>
                <h2 className={styles["form-data"]}> description </h2>
                <Form size="625px" height="303px" multiline placeholder="developed an internal api, worked with a team of 5..." />
              </div>
            </div>


            <h2 className={styles["form-header"]}> key skills </h2>
            <div className={styles["form-section-skills"]}>
              <div>
                <h2 className={styles["form-data"]}> skill #1 </h2>
                <Form size="300px" height="44px" placeholder="Python" />
              </div>

              <div>
                <h2 className={styles["form-data"]}> skill #2 </h2>
                <Form size="300px" height="44px" placeholder="Ruby" />
              </div>

              <div>
                <h2 className={styles["form-data"]}> skill #3 </h2>
                <Form size="300px" height="44px" placeholder="C++" />
              </div>

              <div>
                <h2 className={styles["form-data"]}> skill #4 </h2>
                <Form size="300px" height="44px" placeholder="Assembly" />
              </div>

              <div>
                <h2 className={styles["form-data"]}> skill #5 </h2>
                <Form size="300px" height="44px" placeholder="Java" />
              </div>

              <div>
                <h2 className={styles["form-data"]}> skill #6 </h2>
                <Form size="300px" height="44px" placeholder="AI" />
              </div>
            </div>
          </div>
          <div className={styles["btn-container"]}>
            <button className={styles["submit-btn"]}> Submit </button>
        </div>
      </main>
      
    </>
  );
}
export default Resume;
