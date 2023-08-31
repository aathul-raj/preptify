export default function TutorialThreeText( {styles, setIndex} ){
    return <>
    <div className={`${styles.tutorialBox} ${styles.tutorialThreeText}`}>
        <h1 className={styles.tutorialHeader}>Welcome to Zara!</h1>
        <p className={styles.tutorialText}>See this text box? You'll use this to type your answers. During the interview, simply start typing your response to Zara and submit when you're done. 
        Press 'Next' to continue.</p>
         <div className={styles.tutorialButton} onClick={() => setIndex((prevIndex) => prevIndex + 1)}>Next</div>
    </div>
    </>
}