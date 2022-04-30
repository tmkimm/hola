import React from 'react';
import styles from './toggleSwitch.module.css';

export const toggleSwitch = () => {
  return (
    <div className={styles.switch}>
      <input
        type='checkbox'
        className={styles.switchCheckbox}
        checked={checked}
        onChange={onToggleChange}
        id={'switch-input'}
      ></input>
      <label className={styles.switchLabel} htmlFor={'switch-input'}>
        <div className={styles.ball}></div>
      </label>
    </div>
  );
};
