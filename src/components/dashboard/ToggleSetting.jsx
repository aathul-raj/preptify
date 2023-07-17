import React, { useState } from "react";
import { doc, updateDoc, getDoc, increment, getFirestore } from "firebase/firestore";
import '../../styles/Settings.css'

export default function ToggleSetting({heading, subheading, userRef, id}){
    const [isChecked, setChecked] = useState(false);

    const handleClick = async (id) => {
        const docSnap = await getDoc(userRef);
        const userData = docSnap.data();
        await updateDoc(userRef, {
            "email" : {...userData.email, [id]: !isChecked}
        });
    }

    return <div className="toggle-container">
        <div className="toggle-text">
            <h1>{heading}</h1>
            <h2>{subheading}</h2>
        </div>
        <div className="check-box">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                    setChecked(!isChecked)
                    handleClick(id)
                }}
            />
        </div>
    </div>
}