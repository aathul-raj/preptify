import { useNavigate } from "react-router-dom";
import HomeImages from "../../constants/HomeImages"
import styles from "../../styles/Global.module.css";

export default function MainHeader(){
    const navigate = useNavigate();

    return <div className={styles["header"]}>
                <div className={styles["logo-container"]}>
                <img className={styles["logo-img"]} src={HomeImages.logo} alt="logo" onClick={() => navigate("/")}/>
                </div>
                <div className={styles["auth-buttons-container"]}>
                <button
                    onClick={() => navigate("/login")}
                    className={styles["log-in-button"]}
                >
                    log in
                </button>
                </div>
            </div>
}