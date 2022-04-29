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

export const DesktopFilter = React.memo(() => {
  const { subject, selected } = useSelector((state) => state.language);
  console.log(subject, selected);
  const dispatch = useDispatch();
  const onIconClick = useCallback(
    (Langauge, isSelected) => {
      if (selected.length === 14) {
        dispatch(clearLanguage());
        dispatch(addLanguage(Langauge));
      } else if (selected.length === 1) {
        if (!isSelected) dispatch(addLanguage(Langauge));
        else dispatch(initLanguage());
      } else {
        if (!isSelected) dispatch(addLanguage(Langauge));
        else dispatch(removeLanguage(Langauge));
      }
    },
    [dispatch, selected.length],
  );
  const onDeleteIconClick = (selected) => {
    dispatch(removeLanguage(selected));
  };
  const onSubjectClick = (curSubject) => {
    dispatch(changeSubject(curSubject));
  };

  const resetFilterClick = () => {
    dispatch(clearLanguage());
  };
  const languages = {
    인기: [
      'javascript',
      'typescript',
      'react',
      'vue',
      'svelte',
      'nextjs',
      'nodejs',
      'java',
      'spring',
      'go',
      'nestjs',
    ],
    프론트엔드: ['javascript', 'typescript', 'react', 'vue', 'svelte', 'nextjs'],
    백엔드: [
      'java',
      'spring',
      'nodejs',
      'nestjs',
      'go',
      'kotlin',
      'express',
      'mysql',
      'mongoDB',
      'csharp',
      'python',
      'django',
      'cplusplus',
      'ruby',
      'php',
      'graphql',
      'firebase',
    ],
    모바일: ['flutter', 'swift', 'reactnative', 'unity'],
    기타: ['aws', 'kubernetes', 'docker', 'git', 'figma', 'zeplin', 'jest'],
    모두보기: [],
  };

  const subjects = ['인기', '프론트엔드', '모바일', '기타', '모두보기'];

  return (
    <section className={styles.filterWrapper}>
      <ul className={styles.subjects}>
        {subjects.map((curSubject) => (
          <li
            className={`${styles.subjectItem} ${
              curSubject === subject ? styles.selectedSubject : ''
            }`}
            onClick={() => {
              onSubjectClick(curSubject);
            }}
          >
            {curSubject}
          </li>
        ))}
      </ul>
      <ul className={styles.languages}>
        {languages[subject].map((language) => {
          const isSelected = selected.includes(language);
          return (
            <div
              className={`${styles.languageIcon} ${
                !selected.length || isSelected === true ? styles.full : styles.transparent
              }`}
              onClick={() => onIconClick(language, isSelected)}
            >
              <img
                className={styles.logo}
                src={`/images/languages/${language}.svg`}
                alt={language}
              />
              <span className={styles.languageName}>{language}</span>
            </div>
          );
        })}
      </ul>
      <div className={styles.selectedWrapper}>
        <ul className={styles.selectedLanguages}>
          {selected.map((selected) => (
            <div className={styles.selectedLanguage} onClick={() => onDeleteIconClick(selected)}>
              <li>{selected}</li>
              <img
                className={styles.deleteButton}
                src={`/images/info/delete.svg`}
                alt='deleteButton'
              />
            </div>
          ))}
          {selected.length !== 0 && (
            <span className={styles.resetFilter} onClick={resetFilterClick}>
              필터 초기화
            </span>
          )}
        </ul>
      </div>
    </section>
  );
});
