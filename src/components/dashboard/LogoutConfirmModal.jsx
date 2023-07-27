import React from "react";
import styles from "../../styles/Dashboard.module.css";

const LogoutConfirmModal = ({ isOpen, handleClose, handleLogout }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["logoutModalOverlay"]}>
      <div className={styles["logoutModal"]}>
        <h1>Confirm Logout</h1>
        <p>Are you sure you want to log out?</p>
        <div classname={styles["logout-button-container"]}>
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
