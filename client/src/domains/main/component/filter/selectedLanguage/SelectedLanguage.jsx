import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SelectedLanguage.module.css';
import { clearLanguage, removeLanguage } from 'store/language';
import { capitalize } from 'common/utils';

const SelectedLanguage = () => {
  const { selected } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  return (
    <div className={styles.selectedWrapper}>
      <ul className={styles.selectedLanguages}>
        {selected.map((selected, idx) => (
          <li
            key={idx}
            className={styles.selectedLanguage}
            onClick={() => dispatch(removeLanguage(selected))}
          >
            <span className={styles.languageName}>{capitalize(selected)}</span>
            <img
              className={styles.deleteButton}
              src={`/images/info/delete.svg`}
              alt='deleteButton'
            />
          </li>
        ))}
        {selected.length !== 0 && (
          <div
            className={styles.resetContainer}
            onClick={() => {
              dispatch(clearLanguage());
            }}
          >
            <img
              className={styles.initializeIcon}
              src={`/images/info/initialize.png`}
              alt='initialize'
            />
            <span className={styles.resetFilter}>초기화</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default SelectedLanguage;
