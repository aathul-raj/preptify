import styles from "../styles/Dashboard.module.css"

export default function Popup({ onClose }){
    return (
        <div className={styles["popup-overlay"]}>
            <div className={styles["popup-content"]}>
                <h2>Welcome to <span className={styles["green"]}>Zara!</span></h2>
                <div className={styles["popup-text"]}>
                    <p>Welcome to Zara, our cutting-edge interview AI! For detailed instructions on using Zara, check the email with your credentials. <span className={styles["popup-important"]}>Key points: click the mic to answer, click again to stop, and speak clearly.</span>
                    </p>

                    <p>Your testing account includes three mock interviews. If Zara misbehaves, refresh to restart. Continuous issues? Let us know. 
                    <span className={styles["popup-important"]}> After your interviews, please fill out the linked Google Form in your email to provide feedback.</span></p>

                    <p>Your input shapes Zara for future users. Thank you for joining our beta testing team! </p>
                </div>
                <button onClick={onClose}>Got it</button>
            </div>
        </div>
      );
}