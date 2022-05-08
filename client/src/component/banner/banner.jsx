import React from 'react';
import styles from './banner.module.css';

const Banner = React.memo(() => (
  <section className={styles.banner}>
    <div className={styles.contentWrapper}>
      <div className={styles.bannerContent}>
        <h1 className={styles.title}>
          <span className={styles.titleContent}>스터디와 </span>
          <span className={styles.titleContent}>사이드 프로젝트를 </span>
          <span className={styles.titleContent}>찾는 가장 쉬운 방법</span>
        </h1>
        <div className={styles.subBanner}>
          <div className={styles.subImgWrapper}>
            <img className={styles.subImg} src='images/logo/hola_logo_y.png' alt='sub logo' />
          </div>
          <span className={styles.weak}>에서 함께 할 팀원을 찾아보세요.</span>
        </div>
      </div>
      <div className={styles.bannerImg}>
        <img className={styles.mainImg} src='images/logo/main.png' alt='main logo' />
      </div>
    </div>
  </section>
));
export default Banner;
