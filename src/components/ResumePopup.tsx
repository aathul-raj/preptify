import styles from "../styles/Resume.module.css";
import UploadImage from "../img/icons/upload.png";
import { parseResumeFromPdf } from "../lib/parse-resume-from-pdf";
import React, { useRef, useState } from 'react';
import { cx } from "../lib/cx";
import { deepClone } from "../lib/deep-clone";

interface PopupProps {
    onClose: () => void; // Callback to notify the parent component
  }
  
export default function ResumePopup({onClose}) {
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
        console.log('Uploaded file:', newFile);
        const resume = await parseResumeFromPdf(fileUrl);
        localStorage.setItem('resume', JSON.stringify(resume));
        //console.log(resume);
        closeDialog();
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        onClose();
    };

    return (
        <div>
            {isDialogOpen && (
                <div className={styles["popup-overlay"]}>
                    <div className={styles["popup-content"]}>
                        <h2>Upload Your <span className={styles["highlight"]}>Resume</span></h2>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className={styles["upload-btn"]}
                            onChange={handleFileUpload}
                        />
                        <button type="button" onClick={handleButtonClick} className={styles["popup-btn"]}>
                            <img src={UploadImage} className={styles["popup-img"]} alt="Upload" />
                            upload
                        </button>
                        {/* eventually, change this button to upload and parse a resume with openresume */}
                    </div>
                </div>
            )}
        </div>
    );
}