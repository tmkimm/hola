import { capitalize } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SelectedLanguage.module.css';

const SelectedLanguage = ({ onDeleteIconClick, onResetFilterClick }) => {
  const { selected } = useSelector((state) => state.language);
  return (
    <div className={styles.selectedWrapper}>
      <ul className={styles.selectedLanguages}>
        {selected.map((selected, idx) => (
          <li
            key={idx}
            className={styles.selectedLanguage}
            onClick={() => onDeleteIconClick(selected)}
          >
            <div>{capitalize(selected)}</div>
            <img
              className={styles.deleteButton}
              src={`/images/info/delete.svg`}
              alt='deleteButton'
            />
          </li>
        ))}
        {selected.length !== 0 && (
          <span className={styles.resetFilter} onClick={onResetFilterClick}>
            필터 초기화
          </span>
        )}
      </ul>
    </div>
  );
};

export default SelectedLanguage;
