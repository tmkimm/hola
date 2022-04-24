import React from 'react';
import styles from './desktopFilter.module.css';

export const DesktopFilter = React.memo(() => {
  const languages = {
    popular: [
      'Javascript',
      'Typescript',
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
    frontEnd: ['javascript', 'typescript', 'react', 'vue', 'svelte', 'nextjs'],
    backEnd: [
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
    mobile: ['flutter', 'swift', 'reactnative', 'unity'],
    etc: ['aws', 'kubernetes', 'docker', 'git', 'figma', 'zeplin', 'jest'],
    all: [],
  };

  const subjects = ['인기', '프론트엔드', '모바일', '기타', '모두보기'];
  const seletedLanguages = ['Javascript', 'Typescript'];
  const displayType = true; //selected === true ? styles.full : styles.transparent;

  return (
    <section className={styles.filterWrapper}>
      <ul className={styles.subjects}>
        {subjects.map((subject) => (
          <li className={styles.subjectItem}>{subject}</li>
        ))}
      </ul>
      <ul className={styles.languages}>
        {languages.popular.map((language) => (
          <div className={styles.languageIcon}>
            <img
              className={`${styles.logo} ${displayType}`}
              //onClick={() => onItemClick(language, selected)}
              src={`/images/languages/${language}.svg`}
              alt={language}
            />
            <span className={styles.languageName}>{language}</span>
          </div>
        ))}
      </ul>
      <div className={styles.selectedWrapper}>
        <ul className={styles.selectedLanguages}>
          {seletedLanguages.map((language) => (
            <div className={styles.selectedLanguage}>
              <li>{language}</li>
              <img
                className={styles.deleteButton}
                //onClick={() => onItemClick(language, selected)}
                src={`/images/info/delete.svg`}
                alt='deleteButton'
              />
            </div>
          ))}
        </ul>
        <div className={styles.resetFilter}>필터 초기화</div>
      </div>
    </section>
  );
});
