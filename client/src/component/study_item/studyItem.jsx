import React from "react";
import styles from "./studyItem.module.css";

const StudyItem = ({ study, onStudyClick }) => {
  const studyLang = [];
  for (let i = 0; i < 3; i++) {
    if (study.language[i] === undefined) break;
    studyLang.push(study.language[i]);
  }

  return (
    <li className={styles.studyItem} onClick={() => onStudyClick(study)}>
      <h1 className={styles.title}>{study.title}</h1>
      <ul className={styles.content}>
        {studyLang.map((lang) => (
          <li className={styles.language}>
            <img
              className={styles.languageImage}
              src={`/images/languages/${lang}.png`}
              alt="language"
            />
            <h4 className={styles.languageName}>{lang}</h4>
          </li>
        ))}
      </ul>
      <section className={styles.info}>
        <p>{study.location}</p>
        <p>{study.views}</p>
        <p>4</p>
      </section>
    </li>
  );
};

export default StudyItem;
