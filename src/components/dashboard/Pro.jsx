export default function Pro( {styles} ){
    return <div className={`${styles["tile"]} ${styles["pro-tile"]}`}>
        <h1 className={styles["pro-heading"]}>Unlock <span className={styles["green"]}>More</span> Features</h1>
        <button className={styles["pro-button"]}>Go Pro</button>
    </div>
}