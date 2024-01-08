import Navbar from 'component/nav_bar/navbar';
import React from 'react';
import styles from './style.module.css';
import { getBadgeColor, getBadgeTitle } from 'domains/eventPage/utils/getBadgeTitle';
import { differenceInDays } from 'date-fns';
import {
  getFormattedApplicationDate,
  getFormattedDate,
} from 'domains/eventPage/utils/getFormattedDate';

const DetailMobile = ({ detailData, relativeEvents }) => {
  console.log('detailData : ', detailData);

  if (!detailData) return null;

  return (
    <>
      <Navbar isBackBtn={true} />
      <section className={styles.info}>
        <ul className={styles.badgeList}>
          <li
            style={{
              border: `1px solid ${getBadgeColor(detailData?.eventType)}`,
              color: getBadgeColor(detailData?.eventType),
            }}
            className={styles.badge}
          >
            {getBadgeTitle(detailData?.eventType)}
          </li>
          <li className={styles.deadline}>
            🔥 마감 {differenceInDays(new Date(), new Date(detailData?.applicationEndDate))}일전
          </li>
        </ul>
        <img className={styles.thumbnail} src={detailData?.imageUrl} alt='thumbnail' />
        <div className={styles.titleAndOrganization}>
          <h1 className={styles.title}>{detailData?.title}</h1>
          <span className={styles.description}>주최 | {detailData?.organization}</span>
        </div>

        <div className={styles.scheduleInfo}>
          <div className={styles.evantInfoWrapper}>
            <span className={styles.eventTitle}>일시</span>
            <span className={styles.eventSubTitle}>{getFormattedDate(detailData?.startDate)}</span>
          </div>

          <div className={styles.evantInfoWrapper}>
            <span className={styles.eventTitle}>신청</span>
            <span className={styles.eventSubTitle}>
              <span className={styles.eventSubTitle}>{`${getFormattedApplicationDate(
                detailData?.applicationStartDate,
              )} ~\n${getFormattedApplicationDate(detailData?.applicationEndDate)}`}</span>
            </span>
          </div>

          <div className={styles.evantInfoWrapper}>
            <span className={styles.eventTitle}>장소</span>
            <span className={styles.eventSubTitle}>{detailData?.place}</span>
          </div>
        </div>

        <div>
          <div className={styles.introduce}>소개</div>
          <p className={styles.content} dangerouslySetInnerHTML={{ __html: detailData?.content }} />

          <div>
            <span>조회수 2회</span>
            <span>북마크 2개</span>
          </div>
        </div>
      </section>

      <div className={styles.applyContainer}>
        <button className={styles.applyButton}>지원하기</button>
        <button className={styles.shareButton}>공유하기</button>

        <div className={styles.likeContainer}>
          <img
            alt='likes'
            className={styles.likesImg}
            src={
              // data.likeUsers.find((likeId) => likeId === user.id)
              //   ? '/images/info/bookmark_filled.svg'
              '/images/info/bookmark.svg'
            }
          />
        </div>
      </div>
    </>
  );
};

export default DetailMobile;
