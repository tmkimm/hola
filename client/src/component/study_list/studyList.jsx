import React from "react";
import StudyItem from "../study_item/studyItem";
import styles from "./studyList.module.css";

const StudyList = ({ studyList, onStudyClick }) => (
  <ul className={styles.studyList}>
    {studyList.map((study) => (
      <StudyItem
        onStudyClick={onStudyClick}
        study={study}
        key={study._id}
      ></StudyItem>
    ))}
  </ul>
);

export default StudyList;
