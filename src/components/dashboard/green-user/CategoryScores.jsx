import ProgressBar from "../ProgressBar"

export default function CategoryScores({communication, technical, ps, behavioral, styles}){
    return (
        <div className={`${styles["tile"]} ${styles["category-scores"]}`}>
            <ProgressBar className={styles["progress"]} value={communication} max={10} color="#7667D0" styles={styles}>Comm.</ProgressBar>
            <ProgressBar className={styles["progress"]} value={technical} max={10} color="#C77C0B" styles={styles}>Technical</ProgressBar>
            <ProgressBar className={styles["progress"]} value={ps} max={10} color="#D515C2" styles={styles}>Problem Solving</ProgressBar>
            <ProgressBar className={styles["progress"]} value={behavioral} max={10} color="#15B2D5" styles={styles}>Behavioral</ProgressBar>
        </div>
    )
}