import React from 'react';
import StudyItem from 'component/study_item/studyItem';
import styles from './studyList.module.css';
import { useMediaQuery } from 'react-responsive';
import { useEventLog } from 'domains/main/hooks/useEventLog';

/* StudyList component는 map을 통해 StudyItem component를 생성합니다. */
const StudyList = ({ studyList, type }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { mutate } = useEventLog();

  return (
    <ul className={styles.studyList}>
      {!isMobile && (
        <img
          className={styles.adBlockImg}
          src='images/banner/ad-block.png'
          alt='ad-block'
          onClick={() => {
            mutate({ advertisementId: '65b3c33420a6057557e3a2cb', logType: 'reach' });
            window.open(
              'https://hanghae99.spartacodingclub.kr/v2/plus/be?utm_source=hola&utm_medium=display&utm_campaign=hhplus&utm_content=%ED%95%AD%ED%95%B4%ED%94%8C%EB%9F%AC%EC%8A%A4%EB%B0%B1%EC%97%94%EB%93%9C4%EA%B8%B0%EB%AA%A8%EC%A7%91&utm_term=240125',
              '_blank',
            );
          }}
        />
      )}
      {studyList.map((study) => {
        return <StudyItem study={study} type={type} key={study._id}></StudyItem>;
      })}
    </ul>
  );
};

export default StudyList;
