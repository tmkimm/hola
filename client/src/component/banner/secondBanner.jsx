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
            <h2 className={styles.title}>새롭게 달라진 Hola!</h2>
            <span className={styles.subTitle}>를 소개합니다.</span>
            <span className={styles.subText}>이제 마음 맞는 팀원을 더 쉽게 만나세요 🔍</span>
          </div>
          {/* <div className={styles.rightCover}>
            <img
              className={styles.coverImageFirst}
              src='/images/banner/2_1.png'
              alt='firstBanner'
            />
          </div> */}
          <div className={styles.rightCover}>
            <img className={styles.coverImage} src='/images/banner/2_2.png' alt='firstBanner' />
          </div>
        </div>
      </div>
    </a>
  );
};
