import React from "react";
import MainHeader from "../components/global/MainHeader"
import Footer from "../components/global/Footer"
import OrganizationImage from "../img/organization.png";
import styles from "../styles/views/About.module.css"

function About() {

  return (
    <>
      <main className={styles["about-main"]}>
        <MainHeader/>
        <div className={styles["about-container"]}>
          <div className={styles["about-content"]}>
            <div className={styles["about-text-container"]}>
              <div className={styles["slogan-container"]}>
                <h1 className={styles["about-slogan"]}>
                  we’re building the future of career prep.{" "}
                  <span className={styles["highlight"]}>you in?</span>
                </h1>
              </div>
            </div>
            <img
              className={styles["organization-img"] + " " + styles["parallax-home"]}
              src={OrganizationImage}
              alt="Roman Statue"
              data-value=".4"
            />
          </div>
          <h2 className={styles["about-mission-statement"]}>
            We’re more than just a career prep platform - we’re a dynamic,
            diverse team on a mission to reinvent the landscape of career
            advancement. Our ethos is simple but profound: democratize career
            preparation, equipping people from all walks of life with the tools
            they need to propel their careers forward. At Preptify, we’re not
            just shaping careers , we’re shaping the future.
          </h2>
        </div>
        <Footer/>
      </main>
    </>
  )
}

export default About;
