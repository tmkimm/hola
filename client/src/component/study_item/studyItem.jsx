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
            <p className={styles.languageName}>{lang}</p>
          </li>
        ))}
      </ul>
      <section className={styles.info}>
        <div className={styles.infoItem}>
          <img
            className={styles.itemImg}
            src="/images/info/location.png"
            alt="location"
          />
          <p>{study.location}</p>
        </div>
        <div className={styles.infoItem}>
          <img
            className={styles.itemImg}
            src="/images/info/heart_filled.png"
            alt="location"
          />
          <p>{study.views}</p>
        </div>
      </section>
    </li>
  );
};

export default StudyItem;
