import React from "react";
import StudyItem from "component/study_item/studyItem";
import styles from "./studyList.module.css";

/* StudyList component는 map을 통해 StudyItem component를 생성합니다. */
const StudyList = ({ studyList, lastStudyElementRef }) => (
  <ul className={styles.studyList}>
    {studyList.map((study, index) => {
      if (studyList.length === index + 1)
        return (
          <StudyItem
            lastStudyElementRef={lastStudyElementRef}
            study={study}
            key={study._id}
          ></StudyItem>
        );
      else return <StudyItem study={study} key={study._id}></StudyItem>;
    })}
  </ul>
);

export default StudyList;
