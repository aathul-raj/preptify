import { useState, useEffect } from "react";
import styles from "../styles/Form.module.css";

const Form = ({ size, height, multiline, placeholder, customText, onChange }) => {
  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    setText(customText || '');
  }, [customText]);

  if (multiline) {
    return (
      <textarea className={styles["multiline-form"]}
        style={{ width: size, height: height }}
        value={text}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    );
  }
  return (
    <input className={styles["form"]}
      type="text"
      style={{ width: size, height: height }}
      value={text}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
};

export default Form;
