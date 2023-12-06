import { HolaLogEvent } from 'common/GA';
import React from 'react';
import styles from './newBanner.module.css';
import './carousel.css';

const NewBanner = ({
  title,
  subTitle,
  imgSrc,
  link,
  badgeTitle,
  badgeBgColor,
  badgeTextColor,
  bgColor,
  titleColor,
  totalLength,
  currentIndex,
}) => {
  const handleLinkClick = (e) => {
    HolaLogEvent(`main_banner_${title}`, { category: title });
    e.preventDefault();
    window.location.href = link;
  };
  return (
    <a
      className={styles.bannerLink}
      href={link}
      target='_blank'
      rel='noreferrer'
      onClick={handleLinkClick}
    >
      <div style={{ background: bgColor }} className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            {badgeTitle && (
              <button
                style={{ backgroundColor: badgeBgColor, color: badgeTextColor }}
                className={styles.promotion}
              >
                {badgeTitle}
              </button>
            )}
            <h2 style={{ color: titleColor }} className={styles.title}>
              {title}
            </h2>
            <span style={{ color: titleColor }} className={styles.subTitle}>
              {subTitle}
            </span>
          </div>
          <div className={styles.rightCover}>
            <img className={styles.coverImage} src={imgSrc} alt='banner' />
          </div>
        </div>
      </div>
      <div className={styles.sequenceBadge}>
        {currentIndex + 1} / {totalLength}
      </div>
    </a>
  );
};

export default NewBanner;
