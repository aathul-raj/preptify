import React, { useEffect, useRef, useState } from "react";
import copyImg from '../../img/copy.png'
import exitImg from '../../img/exit.png'
import styles from "../../styles/Dashboard.module.css";

const ReferralModal = ({ isOpen, handleClose, copyLink }) => {
  const modalRef = useRef();
  const [text, setText] = useState("copy link")

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => {
    copyLink();
    setText("copied")
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["referralModalOverlay"]}>
      <div className={styles["referralModal"]} ref={modalRef}>
        <img src={exitImg} className={styles["exitReferralModal"]} onClick={handleClose}/>
        <h1><span className={styles["green"]}>Invite</span> Your Friends!</h1>
        <p>Share the love! Introduce your friends to Zara.</p>
        <button onClick={handleClick}>
          <img src={copyImg} className={styles["buttonImg"]}/>
          <p className={styles["buttonWriting"]}>{text}</p>
        </button>
      </div>
    </div>
  );
};

export default ReferralModal;