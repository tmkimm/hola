import { HolaLogEvent } from 'common/GA';
import React from 'react';
import styles from './firstBanner.module.css';

export const FirstBanner = () => {
  const handleLinkClick = (e) => {
    HolaLogEvent('main_banner', { category: '스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법' });
    e.preventDefault();
    window.location.href =
      'https://temporal-weather-18e.notion.site/Hola-_______-613200b663ab47b2b59c8c5cf0011b2f';
  };

  return (
    <a
      href='https://temporal-weather-18e.notion.site/Hola-_______-613200b663ab47b2b59c8c5cf0011b2f'
      target='_blank'
      rel='noreferrer'
      onClick={handleLinkClick}
    >
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            <h2 className={styles.title}>스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법</h2>

            <div className={styles.subContainer}>
              <span className={styles.subText}>올라에서 함께할 팀원을 찾으세요 🔍</span>
            </div>
          </div>
          <div className={styles.rightCover}>
            <img className={styles.coverImage} src='/images/banner/11.png' alt='firstBanner' />
          </div>
        </div>
      </div>
    </a>
  );
};
