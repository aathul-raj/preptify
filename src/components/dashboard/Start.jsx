import { useState } from "react";
import ZaraStartFinal from "./ZaraStartFinal";
import ZaraStartMain from "./ZaraStartMain";
import ZaraStartSecond from "./ZaraStartSecond";

export default function Start({ setError, setFadeOut, styles}){
    const [index, setIndex] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState({
        industry: 'software-engineering',
        role: 'basic',
        difficulty: 'dynamic',
        questions: '3',
    });

    const screens = [<ZaraStartMain setIndex={setIndex} styles={styles}/>, <ZaraStartSecond setIndex={setIndex} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} styles={styles}/>, <ZaraStartFinal setIndex={setIndex} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} setError={setError} setFadeOut={setFadeOut} styles={styles}/>]

    return screens[index]
}