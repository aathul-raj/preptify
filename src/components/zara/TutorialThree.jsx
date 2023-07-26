export default function TutorialThree( {styles, setIndex} ){
    return <>
    <div className={`${styles.tutorialBox} ${styles.tutorialThree}`}>
        <h1 className={styles.tutorialHeader}>Welcome to Zara!</h1>
        <p className={styles.tutorialText}>See this microphone button? You'll use this to record your answers. During the interview, click once to start recording and click again when you're done talking. 
        Press 'Next' to continue.</p>
         <div className={styles.tutorialButton} onClick={() => setIndex((prevIndex) => prevIndex + 1)}>Next</div>
    </div>
    </>
}