import { HolaLogEvent } from 'common/GA';
import React from 'react';
import styles from './commonBanner.module.css';
import './carousel.css';

const CommonBanner = ({
  title,
  link,
  imageUrl,
  log,
  id,
  onPrev,
  onNext,
  currentIndex,
  totalLength,
}) => {
  const handleLinkClick = (e) => {
    HolaLogEvent(`banner_click`, { category: title });
    log({ advertisementId: id, logType: 'reach' });
    e.preventDefault();
    window.open(link, '_blank');
  };

  return (
    <a
      className={styles.bannerLink}
      href={link}
      target='_blank'
      rel='noreferrer'
      onClick={handleLinkClick}
    >
      <div className={styles.containerWrapper}>
        <img className={styles.bannerImage} src={imageUrl} alt='banner' />
      </div>
      <div className={styles.sequenceBadge}>
        <div
          className={styles.sequenceArea}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onPrev();
          }}
        >
          <img
            src='images/banner/banner-arrowLeft.png'
            className={styles.arrows}
            alt='left-arrow'
          />

          <span>{currentIndex + 1}</span>
        </div>
        <span>|</span>
        <div
          className={styles.sequenceArea}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onNext();
          }}
        >
          <span>{totalLength}</span>

          <img
            className={styles.arrows}
            src='images/banner/banner-arrowRight.png'
            alt='right-arrow'
          />
        </div>
      </div>
    </a>
  );
};

export default CommonBanner;
