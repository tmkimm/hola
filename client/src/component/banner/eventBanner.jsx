import React from 'react';
import styles from './eventBanner.module.css';

export const EventBanner = () => {
  return (
    <a
      className={styles.bannerLink}
      href='https://forms.gle/LkHJrkTfUK7oLWtp8'
      target='_blank'
      rel='noreferrer'
    >
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            <button className={styles.promotion}>EVENT</button>
            <h1 className={styles.title}>스벅 커피 한잔 어때요?</h1>
            <div className={styles.subTitle}>
              올리들의 이야기를 듣고싶어요! 지금 설문에 응답하고 커피 한 잔 해요 ️ ☕️
            </div>
            <div className={styles.subText}>설문 기간 : 10/7~10/31</div>
          </div>
          <div className={styles.rightCover}>
            <img
              className={styles.coverImage}
              src='/images/banner/eventBanner.png'
              alt='event banner'
            />
          </div>
        </div>
      </div>
    </a>
  );
};
