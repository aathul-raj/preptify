import "../../styles/Dashboard.css";
import BackButton from '../../img/icons/back-button.png'
import Next from '../../img/icons/next.png'
import Select from 'react-select';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function ZaraStartFinal( {setIndex, selectedOptions, setSelectedOptions, setError, setFadeOut} ){
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    let navigate = useNavigate();

    const [interviewsCompleted, setInterviewsCompleted] = useState(0);

    useEffect(() => {
        const fetchInterviewsCompleted = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setInterviewsCompleted(docSnap.data().interviewsCompleted);
            } else {
                console.log("No such document!");
            }
        }

        fetchInterviewsCompleted();
    }, [user]);

    function handleClick() {
        if(interviewsCompleted < 3) {
            // Convert the object to a query string
            const queryParam = new URLSearchParams(selectedOptions).toString();
        
            navigate(`/interview?${queryParam}`);
        } else {
            setError("Interview limit reached. Please provide your feedback via the Google form.")
            setTimeout(() => {
                setFadeOut(true); // trigger fade-out
                setTimeout(() => {
                    setError(""); // reset error after 5 seconds
                    setFadeOut(false); // reset fade-out
                }, 500);
            }, 5000);
        }
    }
    

    const difficultyOptions = [
        { value: 'dynamic', label: 'Dynamic' },
        // { value: 'business', label: 'Business' },
    ];

    const numQuestions = [
        { value: '1', label: "1" },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
    ]

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'transparent',
            borderColor: 'white',
            borderRadius: '21px',
            borderWidth: '2px',
            width: 'max-content',
            color: 'white',
            cursor: "pointer"
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
            fontSize: '20px',
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
    

    const handleSelect = (selectedOption, name) => {
        setSelectedOptions((prevOptions) => {
            return {
                ...prevOptions,
                [name] : selectedOption.value
            }
        })
    }

    const should = '\nshould'
    const interview = '\ninterview'
    

    return (
        <div className="start-zara-final">
            <h1 className="zara"><span className="green">Z</span>ARA</h1>
            <h2 className="zara-h2">Interview Setup</h2>
            <div className="question">
                <div className="zara-text">
                    <p>What should the{interview}<span> difficulty</span> be?</p>    
                </div>
                <Select className="zara-dropdown" styles={customStyles} name="difficulty" id="difficulty" options={difficultyOptions} value={difficultyOptions.find(option => option.value === selectedOptions.difficulty)} onChange={option => handleSelect(option, 'difficulty')}/>
            </div>
            <div className="question">
                <div className="zara-text">
                    <p>How many<span> questions</span>{should} be asked?</p>
                </div>
                <Select className="zara-dropdown" styles={customStyles} name="questions" menuPlacement="top" id="questions" options={numQuestions} value={numQuestions.find(option => option.value === selectedOptions.questions)} onChange={option => handleSelect(option, 'questions')}/>
            </div>
            <div className="buttons">
                <img src={BackButton} onClick={() => setIndex((prevIndex) => prevIndex - 1)}/>
                <img src={Next} onClick={handleClick}/>
            </div>
        </div>
    );
}
