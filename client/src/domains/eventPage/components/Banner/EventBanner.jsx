import { HolaLogEvent } from 'common/GA';
import React from 'react';
import styles from './EvenrBanner.module.css';

export const EventBanner = () => {
  const handleLinkClick = (e) => {
    HolaLogEvent('main_banner', { category: '스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법' });
    e.preventDefault();
    window.location.href = 'https://instagram.com/holaworld_official';
  };
  return (
    // TODO: 링크 반영 필요
    <a
      className={styles.bannerLink}
      href='https://instagram.com/holaworld_official'
      target='_blank'
      rel='noreferrer'
      onClick={handleLinkClick}
    >
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            <button className={styles.promotion}>NOTICE</button>
            <div className={styles.imgWrapper}></div>
            <h2 className={styles.title}>이제 Hola!에서도 공모전 일정 정보</h2>
            <span className={styles.subText}>컨퍼런스, 해커톤, 공모전, 부트캠프까지 한번에 🧐</span>
          </div>
          <div className={styles.rightCover}>
            <img
              className={styles.coverImage}
              src='/images/banner/eventBanner.png'
              alt='second banner'
            />
          </div>
        </div>
      </div>
    </a>
  );
};
