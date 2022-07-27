import React from 'react';
import styles from './firstBanner.module.css';

export const FirstBanner = () => {
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.leftCover}>
          <h2 className={styles.title}>스터디와 사이드 프로젝트를 찾는</h2>
          <h2 className={styles.title}>가장 쉬운 방법</h2>

          <div className={styles.subContainer}>
            <img className={styles.subImage} src='/images/logo/hola_logo_y.png' alt='hola logo' />
            <span className={styles.subText}>에서 함께할 개발자를 찾으세요 ⭐️</span>
          </div>
        </div>
        <div className={styles.rightCover}>
          <img className={styles.coverImage} src='/images/banner/1.png' alt='firstBanner' />
        </div>
      </div>
    </div>
  );
};
