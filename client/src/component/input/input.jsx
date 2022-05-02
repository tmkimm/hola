import React from 'react';
import styles from './input.module.css';

export const Input = ({ labelText, placeholder }) => {
  return (
    <>
      {labelText && (
        <label className={styles.labelText} htmlFor='input'>
          {labelText}
        </label>
      )}
      <input className={styles.customInput} id='input' placeholder={placeholder}></input>
    </>
  );
};
