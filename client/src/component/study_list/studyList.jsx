import React from 'react';
import StudyItem from 'component/study_item/studyItem';
import styles from './studyList.module.css';

/* StudyList component는 map을 통해 StudyItem component를 생성합니다. */
const StudyList = ({ studyList, type }) => {
  return (
    <ul className={styles.studyList}>
      {studyList.map((study) => {
        return <StudyItem study={study} type={type} key={study._id}></StudyItem>;
      })}
    </ul>
  );
};

export default StudyList;
