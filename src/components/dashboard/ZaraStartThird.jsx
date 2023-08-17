import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DashboardImages from '../../constants/DashboardImages'

export default function ZaraStartThird( {setIndex, selectedOptions, setSelectedOptions, styles} ){

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    let fontSize = '20'
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
    const should = '\nshould'
    const interview = '\ninterview'


    useEffect(() => {
        const handleResize = () => {
        setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (screenWidth < 1450){
        fontSize='100'
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
            fontSize: {fontSize},
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

    return (
        <div className={styles["start-zara-second"]}>
            <h1 className={styles["zara-heading"]}><span className={styles["green"]}>Z</span>ARA</h1>
            <h2 className={styles["zara-h2"]}>Interview Setup</h2>
            <div className={styles["question"]}>
                <div className={styles["zara-text"]}>
                    <p>What should the{interview}<span> difficulty</span> be?</p>    
                </div>
                <Select className={styles["zara-dropdown"]} styles={customStyles} name="difficulty" id="difficulty" options={difficultyOptions} value={difficultyOptions.find(option => option.value === selectedOptions.difficulty)} onChange={option => handleSelect(option, 'difficulty')}/>
            </div>
            <div className={styles["question"]}>
                <div className={styles["zara-text"]}>
                    <p>How many<span> questions</span> {should} be asked?</p>
                </div>
                <Select className={styles["zara-dropdown"]} styles={customStyles} name="questions" menuPlacement="top" id="questions" options={numQuestions} value={numQuestions.find(option => option.value === selectedOptions.questions)} onChange={option => handleSelect(option, 'questions')}/>
            </div>
            <div className={styles["buttons"]}>
                <img src={DashboardImages.back} onClick={() => setIndex((prevIndex) => prevIndex - 1)}/>
                <img src={DashboardImages.next} onClick={() => setIndex((prevIndex) => prevIndex + 1)}/>
            </div>
        </div>
    );
}
