import React from 'react';
import styles from './input.module.css';

export const Input = ({ labelText, placeholder, value, onChange }) => {
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
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </>
  );
};
