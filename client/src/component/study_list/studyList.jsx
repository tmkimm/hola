import React from 'react';
import StudyItem from 'component/study_item/studyItem';
import styles from './studyList.module.css';
// import { useMediaQuery } from 'react-responsive';
// import { useEventLog } from 'domains/main/hooks/useEventLog';

/* StudyList component는 map을 통해 StudyItem component를 생성합니다. */
const StudyList = ({ studyList, type }) => {
  // const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  // const { mutate } = useEventLog();

  return (
    <ul className={styles.studyList}>
      {/* {!isMobile && (
        <img
          className={styles.adBlockImg}
          src='images/banner/ad-block-ll.png'
          alt='ad-block'
          onClick={() => {
            mutate({ advertisementId: '65cb764fc9cb7c177c881ac1', logType: 'reach' });
            window.open(
              'https://techit.education/school/kdt-backendj-10th?utm_source=hola&utm_medium=vertical&utm_campaign=kdtbesj07_hola',
              '_blank',
            );
          }}
        />
      )} */}
      {studyList.map((study) => {
        return <StudyItem study={study} type={type} key={study._id}></StudyItem>;
      })}
    </ul>
  );
};

export default StudyList;
