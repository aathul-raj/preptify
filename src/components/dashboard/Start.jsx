import ZaraStartFinal from "./ZaraStartFinal";
import ZaraStartMain from "./ZaraStartMain";
import ZaraStartSecond from "./ZaraStartSecond";
import { useState } from "react";

export default function Start(){
    const [index, setIndex] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState({
        industry: 'software-engineering',
        role: 'basic',
        difficulty: 'dynamic',
        questions: '3',
    });

    const screens = [<ZaraStartMain setIndex={setIndex}/>, <ZaraStartSecond setIndex={setIndex} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>, <ZaraStartFinal setIndex={setIndex} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>]

    return screens[index]
}