export default function ProgressBar({value, max, children, color, styles}){
    const percent = (value / max) * 100;

    return (
        <div className={styles["progress-container"]}>
            <div className={styles["progress"]} style={{ 
                backgroundColor: `${color}`, 
                width: `${percent}%`
             }}/>
            <div className={styles["positioner"]}>
                <div className={styles["progress-text"]}>
                    <span>{children}</span>
                    <span className={styles["p-text-right"]} style={{
                        color: `${color}`
                    }}>{value}</span>
                </div>
            </div>
        </div>
    )
}