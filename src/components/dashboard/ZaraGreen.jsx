import lockImg from "../../img/lock.png"; 

export default function ZaraGreen( {styles} ){
    function pricing() {
        // Open the billing link in new tab 
        window.open("https://www.preptify.com/pricing", "_blank");
    }

    return <div className={`${styles["zara-green"]}`}>
            <img src={lockImg} alt="lock image" className={styles["lock-img"]}/>
        <div className={styles["zara-green-content"]}>
            <h1 className={styles["zara-green-heading"]}>Unlock <span className={styles["green"]}>More</span> Features</h1>
            <button className={styles["zara-green-button"]} onClick={pricing}>Get Zara Green</button>
        </div>
    </div>
}