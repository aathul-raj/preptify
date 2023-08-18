import styles from "../styles/Resume.module.css"
import UploadImage from "../img/icons/upload.png";

export default function ResumePopup({ onClose }){
    return (
        <div className={styles["popup-overlay"]}>
            <div className={styles["popup-content"]}>
                <h2>Upload Your <span className={styles["highlight"]}>Resume</span></h2>

                <button onClick={onClose} className={styles["popup-btn"]}>
                    <img src={UploadImage} className={styles["popup-img"]}/>
                    upload</button>
                {/* eventually, change this button to upload and parse a resume with openresume */}
            </div>
        </div>
      );
}