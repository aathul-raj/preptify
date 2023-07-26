export default function TutorialTwo( {styles, setIndex} ){
    return <>
    <div className={`${styles.tutorialBox} ${styles.tutorialTwo}`}>
        <h1 className={styles.tutorialHeader}>Welcome to Zara!</h1>
        <p className={styles.tutorialText}>During the interview, Zara will display interview questions in this section. Be ready to think on your feet, just like a real interview! 
        Press 'Next' to continue.</p>
         <div className={styles.tutorialButton} onClick={() => setIndex((prevIndex) => prevIndex + 1)}>Next</div>
    </div>
    </>
}