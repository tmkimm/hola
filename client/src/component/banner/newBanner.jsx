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
  onPrev,
  onNext,
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
            <img
              className={styles.coverImage}
              src={imgSrc}
              alt='banner'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPrev();
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.sequenceBadge}>
        <img src='images/banner/banner-arrowLeft.png' className={styles.arrows} alt='left-arrow' />
        <div className={styles.pagination}>
          <span>{currentIndex + 1}</span>
          <span>|</span>
          <span>{totalLength}</span>
        </div>

        <img
          className={styles.arrows}
          src='images/banner/banner-arrowRight.png'
          alt='right-arrow'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onNext();
          }}
        />
      </div>
    </a>
  );
};

export default NewBanner;
