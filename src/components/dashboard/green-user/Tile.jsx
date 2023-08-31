export default function Tile( {name, heading, subheading, score, status, styles} ){
    return (
        <div className={`${styles["tile"]} ${styles[name]}`}>
            <div className={styles["tile-text"]}>
                <h1 className={styles["tile-heading"]}>{heading}</h1>
                <h2 className={styles["tile-subheading"]}>{subheading}</h2>
            </div>
            <h1 className={`${styles[status]} ${styles["tile-score"]}`}>{score}</h1>
        </div>
    )
}