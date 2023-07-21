import { useNavigate } from "react-router-dom";
import styles from "../../styles/Global.module.css";

export default function Footer(){
    const navigate = useNavigate();
    
    return <div className={styles["footer"]}>
                <button onClick={() => navigate("/about")}> about </button>
                <button> faq </button>
                <button> contact </button>
            </div>
}