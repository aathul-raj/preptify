import { useState } from "react";
import ZaraStartFinal from "./ZaraStartFinal";
import ZaraStartMain from "./ZaraStartMain";
import ZaraStartSecond from "./ZaraStartSecond";
import ZaraStartThird from "./ZaraStartThird";

export default function Start({ setError, setFadeOut, styles, sub}){
    const [index, setIndex] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState({
        industry: 'software-engineering',
        role: 'basic',
        difficulty: 'dynamic',
        questions: '3',
        resume: false,
    });

    const screens = [<ZaraStartMain setIndex={setIndex} styles={styles}/>, <ZaraStartSecond setIndex={setIndex} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} styles={styles}/>,<ZaraStartThird sub={sub} setIndex={setIndex} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} styles={styles}/>, <ZaraStartFinal setIndex={setIndex} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} setError={setError} setFadeOut={setFadeOut} styles={styles} sub={sub}/>]

    return screens[index]
}