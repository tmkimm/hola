import React from "react";
import styles from "./studyItem.module.css";

const StudyItem = ({ study, onStudyClick }) => {
  return (
    <li className={styles.studyItem} onClick={() => onStudyClick(study)}>
      <h1 className={styles.title}>{study.title}</h1>
      <ul>
        {study.language.map((lang) => (
          <li className={styles.language}>{lang}</li>
        ))}
      </ul>
      <section className={styles.info}>
        <div>{study.location}</div>
        <div>{study.view}</div>
        <div>4</div>
      </section>
    </li>
  );
};

export default StudyItem;
