import CountUp from 'react-countup';
import styles from "../../styles/Feedback.module.css"

export default function Category( {category, score} ){
    const words = category.split(" ");
    
    return (
        <div className={styles["category"]}>
            <div className={styles["category-name"]}>
                <h3>{words[0]}</h3>
                <h3>{words[1]}</h3>
            </div>
            <h2 className={styles["category-score"]}><CountUp end={score} duration={6} delay={1}/></h2>
        </div>
    );
}