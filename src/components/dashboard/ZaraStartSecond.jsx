import "../../styles/dashboard.css";
import BackButton from '../../img/icons/back-button.png'
import NextButton from '../../img/icons/next-button.png'
import Select from 'react-select';
import React, { useState, useEffect } from 'react';

export default function ZaraStartSecond( {setIndex, selectedOptions, setSelectedOptions} ){

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    let fontSize = '20'
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

    const industryOptions = [
        { value: 'software-engineering', label: 'Software Engineering' },
        // { value: 'business', label: 'Business' },
    ];

    const roleOptions = [
        { value: 'basic', label: "Undecided" },
        { value: 'fe-react', label: 'Front-end React Dev' },
        { value: 'be-nodejs', label: 'Back-end Node Dev' },
        { value: 'fullstack-node-react', label: 'Fullstack Dev' },
        { value: 'security-engineering', label: 'Security Engineer' },
        { value: 'data-engineering', label: 'Data Engineer' },
        { value: 'cloud-engineering', label: 'Cloud Engineer' },
        { value: 'cpp-engineering', label: 'C++ Dev' },
    ]

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

    const interviewing = '\ninterviewing'
    const you = '\nyou'
    

    return (
        <div className="start-zara-second">
            <h1 className="zara-heading"><span className="green">Z</span>ARA</h1>
            <h2 className="zara-h2">Interview Setup</h2>
            <div className="question">
                <div className="zara-text">
                    <p>What industry are{you}<span> working </span> in?</p>    
                </div>
                <Select className="zara-dropdown" styles={customStyles} name="industry" id="industry" options={industryOptions} value={industryOptions.find(option => option.value === selectedOptions.industry)} onChange={option => handleSelect(option, 'industry')}/>
            </div>
            <div className="question">
                <div className="zara-text">
                    <p>What role are you<span> {interviewing}</span> for?</p>
                </div>
                <Select className="zara-dropdown" styles={customStyles} name="roles" menuPlacement="top" id="roles" options={roleOptions} value={roleOptions.find(option => option.value === selectedOptions.role)} onChange={option => handleSelect(option, 'role')}/>
            </div>
            <div className="buttons">
                <img src={BackButton} onClick={() => setIndex((prevIndex) => prevIndex - 1)}/>
                <img src={NextButton} onClick={() => setIndex((prevIndex) => prevIndex + 1)}/>
            </div>
        </div>
    );
}
