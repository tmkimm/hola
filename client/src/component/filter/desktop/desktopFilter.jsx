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

const languages = {
  인기: [
    'Udemy',
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
    'Svelte',
    'Nextjs',
    'Nodejs',
    'Java',
    'Spring',
    'Go',
    'Nestjs',
  ],
  프론트엔드: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Svelte', 'Nextjs'],
  백엔드: [
    'Java',
    'Spring',
    'Nodejs',
    'Nestjs',
    'Go',
    'Kotlin',
    'Express',
    'MySQL',
    'MongoDB',
    'Python',
    'Django',
    'php',
    'GraphQL',
    'Firebase',
  ],
  모바일: ['Flutter', 'Swift', 'ReactNative', 'Unity'],
  기타: ['Aws', 'Kubernetes', 'Docker', 'Git', 'Figma', 'Zeplin', 'Jest', 'C'],
  모두보기: [
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
    'Svelte',
    'Nextjs',
    'Nodejs',
    'Java',
    'Spring',
    'Go',
    'Nestjs',
    'Kotlin',
    'Express',
    'MySQL',
    'MongoDB',
    'Python',
    'Django',
    'php',
    'GraphQL',
    'Firebase',
    'Flutter',
    'Swift',
    'ReactNative',
    'Unity',
    'Aws',
    'Kubernetes',
    'Docker',
    'Git',
    'Figma',
    'Zeplin',
    'Jest',
  ],
};

const subjects = ['인기', '프론트엔드', '백엔드', '모바일', '기타', '모두보기'];

export const DesktopFilter = React.memo(() => {
  const { subject, selected } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const onIconClick = useCallback(
    (Langauge, isSelected) => {
      if (!isSelected) dispatch(addLanguage(Langauge));
      else {
        selected.length === 1 ? dispatch(initLanguage()) : dispatch(removeLanguage());
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

  const onResetFilterClick = () => {
    dispatch(clearLanguage());
  };

  return (
    <section className={styles.filterWrapper}>
      <ul className={styles.subjects}>
        {subjects.map((curSubject, idx) => (
          <li
            key={idx}
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
        {languages[subject].map((language, idx) => {
          const isSelected = selected.includes(language);
          return (
            <li
              key={idx}
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
            </li>
          );
        })}
      </ul>
      <div className={styles.selectedWrapper}>
        <ul className={styles.selectedLanguages}>
          {selected.map((selected, idx) => (
            <li
              key={idx}
              className={styles.selectedLanguage}
              onClick={() => onDeleteIconClick(selected)}
            >
              <div>{selected}</div>
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
