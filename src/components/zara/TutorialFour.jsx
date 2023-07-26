export default function TutorialFour( {styles, handleTutorial} ){

    return <>
    <div className={`${styles.tutorialBox}`}>
        <h1 className={styles.tutorialHeader}>Welcome to Zara!</h1>
        <p className={styles.tutorialText}>Great, you're all set! As soon as you start the interview, Zara tracks everything from answer length to response time and even answer quality. You'll see this feedback at the end.
        So, aim for your best! Now, good luck with your interview!</p>
         <div className={styles.tutorialButton} onClick={() => handleTutorial()}>Start</div>
    </div>
    </>
}