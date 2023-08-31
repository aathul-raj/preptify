export default function TutorialOne( {styles, setIndex} ){
    return <div className={styles.tutorialBox}>
        <h1 className={styles.tutorialHeader}>Welcome to Zara!</h1>
        <p className={styles.tutorialText}>Since this is your first mock interview, let’s guide you through a quick tutorial to get you familiar with the features and flow.
         Hit next to get started!</p>
         <div className={styles.tutorialButton} onClick={() => setIndex((prevIndex) => prevIndex + 1)}>Next</div>
    </div>
}