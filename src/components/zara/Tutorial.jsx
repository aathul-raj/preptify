import { useState } from "react"
import TutorialOne from "./TutorialOne"
import TutorialTwo from "./TutorialTwo"
import TutorialThree from "./TutorialThree"
import TutorialFour from "./TutorialFour"
import TutorialThreeText from "./TutorialThreeText"

export default function Tutorial( {styles, index, setIndex, handleTutorial, isLoading, textInterview} ){
    
    let screens;
    if (textInterview){
        screens = [<TutorialOne styles={styles} setIndex={setIndex}/>, <TutorialTwo styles={styles} setIndex={setIndex}/>, <TutorialThreeText styles={styles} setIndex={setIndex}/>, <TutorialFour styles={styles} setIndex={setIndex} handleTutorial={handleTutorial}/>]
    } else {
        screens = [<TutorialOne styles={styles} setIndex={setIndex}/>, <TutorialTwo styles={styles} setIndex={setIndex}/>, <TutorialThree styles={styles} setIndex={setIndex}/>, <TutorialFour styles={styles} setIndex={setIndex} handleTutorial={handleTutorial}/>]
    }
    
    return <div className={`${styles.tutorialContainer} ${isLoading ? styles['hidden'] : styles['visible']}`}>
        {screens[index]}
    </div>
}