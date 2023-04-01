import React from 'react';
import styles from './secondBanner.module.css';

export const SecondBanner = () => {
  return (
    <a
      className={styles.bannerLink}
      href='https://temporal-weather-18e.notion.site/Hola-22-05-09-660d9f48d6f044499035b10055d54d1c'
      target='_blank'
      rel='noreferrer'
    >
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            <button className={styles.promotion}>NOTICE</button>
            <div className={styles.imgWrapper}></div>
            <h2 className={styles.title}>Hola!는 봄맞이 새단장 완료</h2>
            <span className={styles.subText}>더 편해진 Hola! 모르는 사람 없게 해주세요!</span>
          </div>
          <div className={styles.rightCover}>
            <img className={styles.coverImage} src='/images/banner/2.png' alt='second banner' />
          </div>
        </div>
      </div>
    </a>
  );
};
