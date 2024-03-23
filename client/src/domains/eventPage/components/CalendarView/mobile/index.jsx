import React from 'react';
import styles from './MobileCalendarView.module.css';

const MobileCalendarView = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hand}>👋🏻</div>
      <div className={styles.title}>모바일 캘린더뷰는 열심히 준비 중!</div>
      <div className={styles.title}>곧 만나요</div>
    </div>
  );
};

export default MobileCalendarView;
