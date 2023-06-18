import "../styles/Feedback.css";
import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup';

export default function Category( {category, score} ){
    const words = category.split(" ");
    return <div className="category">
        <div className="category-name">
            <h3>{words[0]}</h3>
            <h3>{words[1]}</h3>
        </div>
        <h2 className="category-score"><CountUp end={score} duration={6} delay={1}/></h2>
    </div>
}