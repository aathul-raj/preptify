import styles from "../styles/views/Resume.module.css";
import UploadImage from "../img/icons/upload.png";
import ExitImage from "../img/icons/x-button.png";
import { parseResumeFromPdf } from "../lib/parse-resume-from-pdf";
import React, { useRef, useState } from 'react';
import { cx } from "../lib/cx";
import { deepClone } from "../lib/deep-clone";
import { useNavigate } from 'react-router-dom';

interface PopupProps {
    onClose: () => void; // Callback to notify the parent component
  }

export default function ResumePopup(props) {
    const defaultFileState = {
        name: "",
        size: 0,
        fileUrl: "",
      };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
    const [file, setFile] = useState(defaultFileState);

    
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle the file upload logic here
        const files = event.target.files;

        if (!files) return;

        const newFile = event.target.files[0];

        if (!newFile.name.endsWith(".pdf"))
            return;

        const { name, size } = newFile;
        const fileUrl = URL.createObjectURL(newFile);
        const resume = await parseResumeFromPdf(fileUrl);
        localStorage.setItem('resume', JSON.stringify(resume));
        redirectToResume();
    };

    const navigate = useNavigate();

    const redirectToResume = () => {
        // navigate to url/resume
        navigate('/resume')
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    if(props.getButton) {
        return (
            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className={styles["upload-btn"]}
                    onChange={handleFileUpload}
                />
                <button type="button" onClick={handleButtonClick} className={styles["popup-btn2"]}>
                    upload your resume
                </button>
            </div>
        );
    }

    return (
        <div>
            {isDialogOpen && (
                    <div className={styles["popup-overlay"]}>
                        <div className={styles["popup-content"]}>
                            <h2 className={styles["main-text"]}>
                                Want <span className={styles["highlight"]}>resume</span>-based interviews?
                            </h2>
                            <h2 className={styles["description-text"]}>
                                You can always do this later
                                in your settings.
                            </h2>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className={styles["upload-btn"]}
                                onChange={handleFileUpload}
                            />
                            <button type="button" onClick={handleButtonClick} className={styles["popup-btn"]}>
                                upload your resume
                            </button>
                        </div>
                        <button type="button" onClick={closeDialog} className={styles["exit-btn"]}>
                            <img src={ExitImage} className={styles["popup-exit-img"]} alt="Upload" />
                        </button>
                    </div>
            )}
        </div>
    );
}