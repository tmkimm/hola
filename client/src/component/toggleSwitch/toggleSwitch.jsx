import React from 'react';
import styles from './toggleSwitch.module.css';

export const ToggleSwitch = ({ checked, handleSelect }) => {
  return (
    <div className={styles.switch}>
      <span className={styles.switchTitle}>모집 중만 보기</span>
      <label
        className={`${styles.switchLabel} ${checked && styles.switchChecked}`}
        htmlFor='switchInput'
      >
        <input
          type='checkbox'
          className={styles.switchCheckbox}
          checked={checked}
          onChange={handleSelect}
          id='switchInput'
        ></input>
        <div className={styles.ball}></div>
      </label>
    </div>
  );
};
