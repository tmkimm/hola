import React from 'react';
import StudyItem from 'component/study_item/studyItem';
import styles from './studyList.module.css';

/* StudyList component는 map을 통해 StudyItem component를 생성합니다. */
const StudyList = ({ studyList }) => {
  return (
    <ul className={styles.studyList}>
      <a className={styles.link} href='https://bit.ly/3z52d4D' target='_blank' rel='noreferrer'>
        <img
          className={styles.bannerImg}
          title={'Event Banner'}
          src={'/images/banner/bannerBlock.png'}
          alt='Event Banner'
        />
      </a>
      {studyList.map((study) => {
        return <StudyItem study={study} key={study._id}></StudyItem>;
      })}
    </ul>
  );
};

export default StudyList;
