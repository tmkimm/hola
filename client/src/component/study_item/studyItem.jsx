import React from "react";
import styles from "./studyItem.module.css";

const StudyItem = ({ study, onStudyClick }) => {
  return (
    <li className={styles.studyItem} onClick={() => onStudyClick(study)}>
      <h1 className={styles.title}>{study.title}</h1>
      <ul className={styles.content}>
        {study.language.map((lang) => (
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
        <div>{study.location}</div>
        <div>{study.views}</div>
        <div>4</div>
      </section>
    </li>
  );
};

export default StudyItem;
