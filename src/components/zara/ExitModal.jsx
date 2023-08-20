
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { doc, updateDoc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from '../../styles/ExitModal.module.css'

export default function ExitModal( {setShowExit, showExit} ){
    let navigate = useNavigate()

    const handleExit = () => {
        navigate('/dashboard', { replace: true, state: {} });
    }

    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    
    return <div className={styles["exit-modal-overlay"]} onClick={() => setShowExit(!showExit)}>
        <div className={styles["exit-modal"]} onClick={stopPropagation}>
            <h1 className={styles["exit-heading"]}>Are you sure you want to end this interview?</h1>
            <h2 className={styles["exit-subheading"]}>This interview will still count towards your daily interview limit and your progress will not be saved.</h2>

            <div className={styles["modal-actions"]}>
                    <div className={styles["exit-button"]} onClick={() => handleExit()}>
                        <span className={styles['exit-button-text']}>stop</span>
                    </div>
                    <div className={styles["exit-button"]} onClick={() => setShowExit(!showExit)}>
                        <span className={styles['exit-button-text']}>stay</span> 
                    </div>
            </div>
        </div>
    </div>
}