import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './desktopFilter.module.css';
import {
  addLanguage,
  clearLanguage,
  initLanguage,
  removeLanguage,
  changeSubject,
} from 'store/language';
import { languageMap } from 'common/options';
import { capitalize } from 'common/utils';
import Category from '../category/Category';
import LanguageBar from 'component/languageIBar/LanguageBar';

export const DesktopFilter = React.memo(() => {
  const { selected } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const onIconClick = useCallback(
    (Langauge, isSelected) => {
      if (!isSelected) dispatch(addLanguage(languageMap[Langauge]));
      else {
        selected.length === 1
          ? dispatch(initLanguage())
          : dispatch(removeLanguage(languageMap[Langauge]));
      }
    },
    [dispatch, selected.length],
  );

  const onDeleteIconClick = (selected) => {
    dispatch(removeLanguage(selected));
  };
  const onCategoryClick = (curSubject) => {
    dispatch(changeSubject(curSubject));
  };

  const onResetFilterClick = () => {
    dispatch(clearLanguage());
  };

  return (
    <section className={styles.filterWrapper}>
      <Category onCategoryClick={onCategoryClick} />
      <LanguageBar onIconClick={onIconClick} />

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
    </section>
  );
});
