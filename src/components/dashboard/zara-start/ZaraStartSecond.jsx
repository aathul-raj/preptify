import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DashboardImages from '../../../constants/DashboardImages'

export default function ZaraStartSecond( {setIndex, selectedOptions, setSelectedOptions, styles} ){

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    let fontSize = '20'
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
        { value: 'zfellow', label: 'ZFellow'},
        // ABOVE ONLY FOR ZFELLOW
    ]
    const interviewing = '\ninterviewing'
    const you = '\nyou'


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
                    <p>What industry are{you}<span> working </span> in?</p>    
                </div>
                <Select className={styles["zara-dropdown"]} styles={customStyles} name="industry" id="industry" options={industryOptions} value={industryOptions.find(option => option.value === selectedOptions.industry)} onChange={option => handleSelect(option, 'industry')}/>
            </div>
            <div className={styles["question"]}>
                <div className={styles["zara-text"]}>
                    <p>What role are you<span> {interviewing}</span> for?</p>
                </div>
                <Select className={styles["zara-dropdown"]} styles={customStyles} name="roles" menuPlacement="top" id="roles" options={roleOptions} value={roleOptions.find(option => option.value === selectedOptions.role)} onChange={option => handleSelect(option, 'role')}/>
            </div>
            <div className={styles["buttons"]}>
                <img src={DashboardImages.back} onClick={() => setIndex((prevIndex) => prevIndex - 1)}/>
                <img src={DashboardImages.next} onClick={() => setIndex((prevIndex) => prevIndex + 1)}/>
            </div>
        </div>
    );
}
