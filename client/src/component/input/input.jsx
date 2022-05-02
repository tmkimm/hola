import React from 'react';
import styles from './input.module.css';

export const Input = ({ labelText, placeholder, value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      {labelText && (
        <label className={styles.labelText} htmlFor='input'>
          {labelText}
        </label>
      )}
      <input
        className={styles.customInput}
        id='input'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      ></input>
    </>
  );
};
