import "../../styles/Dashboard.css";
import BackButton from '../../img/icons/back-button.png'
import NextButton from '../../img/icons/next-button.png'
import Select from 'react-select';
import React, { useState } from 'react';

export default function ZaraStartSecond( {setIndex, selectedOptions, setSelectedOptions} ){

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

    const interviewing = '\ninterviewing'
    const working = '\nworking'
    

    return (
        <div className="start-zara-second">
            <h1 className="zara"><span className="green">Z</span>ARA</h1>
            <h2 className="zara-h2">Interview Setup</h2>
            <div className="question">
                <div className="zara-text">
                    <p>What industry are you<span> {working} </span> in?</p>    
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