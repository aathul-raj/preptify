export default function TileBasic( {name, heading, subheading, score, status, styles} ){
    return (
        <div className={`${styles["tile-basic"]} ${styles[name + "-basic"]}`}>
            <div className={styles["tile-text-basic"]}>
                <h1 className={styles["tile-heading-basic"]}>{heading}</h1>
                <h2 className={styles["tile-subheading-basic"]}>{subheading}</h2>
            </div>
            <h1 className={`${styles[status]} ${styles["tile-score-basic"]}`}>{score}</h1>
        </div>
    )
}