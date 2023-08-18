import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../back-end/Firebase';
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import Select from 'react-select';
import DashboardImages from "../../constants/DashboardImages";

export default function ZaraStartFinal( {setIndex, selectedOptions, setSelectedOptions, setError, setFadeOut, styles, sub} ){
    const db = getFirestore();
    const user = auth.currentUser;
    let navigate = useNavigate();
    const [interviewsCompleted, setInterviewsCompleted] = useState(0);
    const [lastInterviewDate, setLastInterviewDate] = useState(null);
    const resume = [
        { value: false, label: 'No' },
    ];

    const resumeText = '\nresume'


    useEffect(() => {
        const fetchLastInterviewDate = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.data().lastInterviewDate){
                    setLastInterviewDate(docSnap.data().lastInterviewDate);
                } else{
                    await setDoc(doc(db, "users", user.uid), { tutorialShown: false }, { merge: true });
                }        
            }
        }
        
        fetchLastInterviewDate();
    }, []);

    function handleStartInterview() {
        const currentDate = new Date().toISOString().split('T')[0];
        console.log(currentDate)
        if(lastInterviewDate !== currentDate || sub == "zara green") {
            // Convert the object to a query string
            // const queryParam = new URLSearchParams().toString();
            const userDocRef = doc(db, "users", user.uid);
            setDoc(userDocRef, { lastInterviewDate: currentDate }, { merge: true });
            navigate(`/interview`, { state: { fromButton: true, queryParam: selectedOptions, sub: sub } });
        } else {
            setError("You can only take one interview per day without Zara Green. Please come back tomorrow.")
            setTimeout(() => {
                setFadeOut(true); // trigger fade-out
                setTimeout(() => {
                    setError(""); // reset error after 5 seconds
                    setFadeOut(false); // reset fade-out
                }, 500);
            }, 5000);
        }
    }

    const handleSelect = (selectedOption, name) => {
        setSelectedOptions((prevOptions) => {
            return {
                ...prevOptions,
                [name] : selectedOption.value
            }
        })
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            borderColor: 'white',
            borderRadius: '21px',
            borderWidth: '2px',
            width: 'max-content',
            color: 'white',
            cursor: "pointer",
            margin: '0 10px'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
            fontSize: 17,
            fontFamily: 'Roboto',
            padding: '10px',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#222328',
            borderRadius: '5px'
        }),
        menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
                width: "2px",
              },
              "::-webkit-scrollbar-track": {
                background: "#222328"
              },
              "::-webkit-scrollbar-thumb": {
                background: "#888"
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#555"
            }
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            backgroundColor: state.isSelected ? '#141519' : state.isFocused ? '#15D59F' : 'transparent',
            // borderRadius: '10px',
            // color: state.isSelected ? 'white' : 'black',
            padding: '10px',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: state.isFocused ? 'white' : 'white',
            ":hover": {
                color: 'white',
            },
        }),
    };

    return (
        <div className={styles["start-zara-final"]}>
            <h1 className={styles["zara-heading"]}><span className={styles["green"]}>Z</span>ARA</h1>
            <h2 className={styles["zara-h2"]}>Interview Setup</h2>
            <div className={styles["question"]}>
                <div className={styles["zara-text"]}>
                    <p>Should this be a <span>{resumeText}</span> based interview?</p>    
                </div>
                <Select className={styles["zara-dropdown"]} styles={customStyles} name="resume" id="resume" options={resume} value={resume.find(option => option.value === selectedOptions.resume)} onChange={option => handleSelect(option, 'resume')}/>
            </div>
            <div className={styles["buttons"]}>
                <img src={DashboardImages.back} onClick={() => setIndex((prevIndex) => prevIndex - 1)}/>
                <img src={DashboardImages.start} onClick={handleStartInterview}/>
            </div>
        </div>
    );    
}
