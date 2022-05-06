import React from 'react';
import styles from './studyInfo.module.css';

export const StudyInfo = () => {
  return (
    <ul className={styles.studyGrid}>
      <li className={styles.contentWrapper}>
        <span className={styles.title}>모집 구분</span>
        <span className={styles.content}>스터디</span>
      </li>
      <li className={styles.contentWrapper}>
        <span className={styles.title}>진행 방식</span>
        <span className={styles.content}>온라인</span>
      </li>
      <li className={styles.contentWrapper}>
        <span className={styles.title}>모집 인원</span>
        <span className={styles.content}>10명</span>
      </li>
      <li className={styles.contentWrapper}>
        <span className={styles.title}>시작 예정</span>
        <span className={styles.content}>2022.04.16</span>
      </li>
      <li className={styles.contentWrapper}>
        <span className={styles.title}>연락 방법</span>
        <span className={styles.content}>카카오틱 오픈 채팅</span>
      </li>
      <li className={styles.contentWrapper}>
        <span className={styles.title}>예상 기간</span>
        <span className={styles.content}>3개월</span>
      </li>
      <li className={styles.contentWrapper}>
        <span className={styles.title}>사용 언어</span>
        <span className={styles.content}>react</span>
      </li>
    </ul>
  );
};
