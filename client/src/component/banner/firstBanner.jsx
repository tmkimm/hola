import React from 'react';
import styles from './firstBanner.module.css';

export const FirstBanner = () => {
  return (
    <a
      className={styles.bannerLink}
      href='https://sturdy-dugout-e49.notion.site/Udemy-X-Hola-Study-with-Me-5299159dd78e424181c8cdbf7d5be46c'
      target='_blank'
      rel='noreferrer'
    >
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            <button className={styles.promotion}>PROMOTION</button>
            {/* <div className={styles.LogoWrapper}>
              <img src='/images/banner/collaboLogo.png' alt='logo img' />
            </div> */}
            <h2 className={styles.title}>50개의 유료강의, 올라에서만 무료로! </h2>
            {/* <span className={styles.subTitle}>로 들으실 분 찾아요!</span> */}
            <span className={styles.subText}>유데미 강의 무료로 들으실 분 찾아요 ⭐️</span>
          </div>
          <div className={styles.rightCover}>
            <img className={styles.coverImage} src='/images/banner/1.png' alt='firstBanner' />
          </div>
        </div>
      </div>
    </a>
  );
};
