import React, { useEffect, useRef } from "react";
import styles from "../../../styles/views/Dashboard.module.css";

const LogoutConfirmModal = ({ isOpen, handleClose, handleLogout }) => {
  const modalRef = useRef();

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["logoutModalOverlay"]}>
      <div className={styles["logoutModal"]} ref={modalRef}>
        <h1>Confirm Logout</h1>
        <p>Are you sure you want to log out?</p>
        <div className={styles["logout-button-container"]}>
          <button className={styles["confirm"]} onClick={handleLogout}>
            {" "}
            <span className={styles["highlight"]}>Confirm</span>
          </button>
          <button className={styles["cancel"]} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
