import React, { useEffect } from "react";
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import EntryImages from "../constants/EntryImages";
import Form from "../components/Form";
import styles from "../styles/Resume.module.css";
import Popup from "../components/ResumePopup"

function Resume() {
  const navigate = useNavigate();
  const PopUpRef = React.createRef();

  const [resumeObject, setResumeObject] = useState({
    name: "",
    email: "",
    education: "",
    description: "",
    workExperience1: "",
    workExperience2: "",
    skills: "",
  });
  

  const popUpClosed = () => {
    var resume = JSON.parse(localStorage.getItem('resume'))
    console.log(resume);
    if(resume == null)
      return;
    // setting education and work experiences
    console.log(resume.educations.length);
    var work1 = {
      company: "",
      date: "",
      descriptions: "",
      jobTitle: "",
    }

    var work2 = {
      company: "",
      date: "",
      descriptions: "",
      jobTitle: "",
    }

    var edu = {
      school: "",
      degree: "",
      date: "",
    }

    if(resume.educations.length >= 1) {
      edu.school = resume.educations[0].school;
      edu.degree = resume.educations[0].degree;
      edu.date = resume.educations[0].date;
    }

    if(resume.workExperiences.length >= 1) {
      work1.company = resume.workExperiences[0].company;
      work1.date = resume.workExperiences[0].date;
      work1.descriptions = resume.workExperiences[0].descriptions;
      work1.jobTitle = resume.workExperiences[0].jobTitle;
      if(resume.workExperiences.length >= 2) {
        work2.company = resume.workExperiences[1].company;
        work2.date = resume.workExperiences[1].date;
        work2.descriptions = resume.workExperiences[1].descriptions;
        work2.jobTitle = resume.workExperiences[1].jobTitle;
      }
    }

    setResumeObject({
      ...resumeObject,
      name: resume.profile.name,
      email: resume.profile.email,
      description: resume.profile.summary,
      skills: resume.skills,
      education: edu,
      workExperience1: work1,
      workExperience2: work2,
    });
  }

  return (
    <>
      <main>
        <Popup onClose={popUpClosed}/>
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
              <Form size="300px" height="44px" placeholder="First" customText={resumeObject.name.split(" ")[0]}/>
              <Form size="300px" height="44px" placeholder="Last" customText={resumeObject.name.split(" ")[1]}/>
              <h2 className={styles["form-data"]}> email </h2>
              <Form size="625px" height="44px" placeholder="example@gmail.com" customText={resumeObject.email}/>
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
                <Form size="625px" height="44px" placeholder="school name" customText={resumeObject.education.school} />
                <h2 className={styles["form-data"]}> major </h2>
                <Form size="625px" height="44px" placeholder="ba in computer science, ba in data science, etc." customText={resumeObject.education.degree}/>
              </div>
              <div className={styles["form-section-description"]}>
                <h2 className={styles["form-data"]}> expected graduation </h2>
                <Form size="625px" height="44px" placeholder="MM/YY, or 'graduated'" customText={resumeObject.education.date} />
              </div>
            </div>

            <div className={styles["form-section-work"]}>
              
              <div>
              <h2 className={styles["form-header"]}> work experience </h2>
              <h2 className={styles["form-data"]}> employer <span className={styles["highlight"]}> #1 </span> </h2>
              <Form size="300px" height="44px" placeholder="company name" customText={resumeObject.workExperience1.company}/>
              <h2 className={styles["form-data"]}> job title </h2>
              <Form size="625px" height="44px" placeholder="entry level engineer" customText={resumeObject.workExperience1.jobTitle}/>
              <h2 className={styles["form-data"]}> from </h2>
              <Form size="625px" height="44px" placeholder="January 2020 - Present" customText={resumeObject.workExperience1.date}/>
              </div>
              <div className={styles["form-section-description"]}>
                <h2 className={styles["form-data"]}> description </h2>
                  <Form size="625px" height="303px" multiline placeholder="developed an internal api, worked with a team of 5..." customText={resumeObject.workExperience1.descriptions}/>
              </div>
            </div>

            <div className={styles["form-section-work"]}>
              
              <div>
                <h2 className={styles["form-data"]}> employer <span className={styles["highlight"]}> #2 </span> </h2>
                <Form size="300px" height="44px" placeholder="company name" customText={resumeObject.workExperience2.company}/>
                <h2 className={styles["form-data"]}> job title </h2>
                <Form size="625px" height="44px" placeholder="entry level engineer" customText={resumeObject.workExperience2.jobTitle}/>
                <h2 className={styles["form-data"]}> from </h2>
                <Form size="625px" height="44px" placeholder="January 2020 - Present" customText={resumeObject.workExperience2.date}/>
              </div>
              <div className={styles["form-section-description-2"]}>
                <h2 className={styles["form-data"]}> description </h2>
                <Form size="625px" height="303px" multiline placeholder="developed an internal api, worked with a team of 5..." customText={resumeObject.workExperience2.descriptions}/>
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
