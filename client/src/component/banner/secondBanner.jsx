import React from 'react';
import styles from './secondBanner.module.css';

export const SecondBanner = () => {
  return (
    <a className={styles.bannerLink} href='https://naver.com' target='_blank' rel='noreferrer'>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            <button className={styles.promotion}>NOTICE</button>
            <div className={styles.imgWrapper}></div>
            <h2 className={styles.title}>새롭게 단장한 Hola!를 소개합니다.</h2>
            <span className={styles.subText}>이제 마음 맞는 팀원을 더 쉽게 만나세요!</span>
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
