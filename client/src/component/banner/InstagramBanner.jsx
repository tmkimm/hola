import { HolaLogEvent } from 'common/GA';
import React from 'react';
import styles from './instagramBanner.module.css';

export const InstagramBanner = () => {
  const handleLinkClick = (e) => {
    HolaLogEvent('main_banner_instagram', { category: 'instagram_banner' });
    e.preventDefault();
    window.location.href = 'https://instagram.com/holaworld_official';
  };
  return (
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
            <h2 className={styles.title}>Hola! 공식 인스타그램 OPEN!</h2>
            <span className={styles.subText}>지금 팔로우하고 다양한 올라 소식을 만나보세요 👋</span>
          </div>
          <div className={styles.rightCover}>
            <img className={styles.coverImage} src='/images/banner/33.png' alt='second banner' />
          </div>
        </div>
      </div>
    </a>
  );
};
