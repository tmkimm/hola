import { HolaLogEvent } from 'common/GA';
import React from 'react';
import styles from './secondBanner.module.css';

export const SecondBanner = () => {
  const handleLinkClick = (e) => {
    HolaLogEvent('main_banner', { category: '스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법' });
    e.preventDefault();
    window.location.href =
      'https://temporal-weather-18e.notion.site/Hola-23-04-01-74538d7012f0423e87d5c956e2ebf795';
  };

  return (
    <a
      className={styles.bannerLink}
      href='https://temporal-weather-18e.notion.site/Hola-23-04-01-74538d7012f0423e87d5c956e2ebf795'
      target='_blank'
      rel='noreferrer'
      onClick={handleLinkClick}
    >
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            <button className={styles.promotion}>NOTICE</button>
            <div className={styles.imgWrapper}></div>
            <h2 className={styles.title}>Hola!는 봄맞이 새단장 완료</h2>
            <span className={styles.subText}>더 편해진 올라! 모르는 사람 없게 해주세요 🙏</span>
          </div>
          <div className={styles.rightCover}>
            <img className={styles.coverImage} src='/images/banner/22.png' alt='second banner' />
          </div>
        </div>
      </div>
    </a>
  );
};
