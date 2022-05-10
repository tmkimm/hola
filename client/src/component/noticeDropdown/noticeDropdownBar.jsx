import React from 'react';
import styles from './noticeDropdownBar.module.css';

export const NoticeDropdownBar = () => {
  return (
    <div className={styles.noticeWrapper}>
      <div className={styles.noticeHeader}>
        <span classname={styles.title}>읽지 않은 알림 (1) </span>
      </div>
      <ul className={styles.noticeBody}>
        <li className={styles.noticeTitleWrapper}>
          <p className={styles.noticeTitle}>💌 Udemy 쿠폰이 도착했어요!</p>
          <p className={styles.noticeContent}>
            신청하신 강의 쿠폰이 도착했어요. 링크를 클릭하여 등록해주세요.
          </p>
          <a className={styles.anchor} href='https://naver.com' target='_blank' rel='noreferrer'>
            쿠폰 사용하러 가기!
          </a>
        </li>
        <li className={styles.noticeTitleWrapper}>
          <p className={styles.noticeTitle}>💌 Udemy 쿠폰이 도착했어요!</p>
          <p className={styles.noticeContent}>
            신청하신 강의 쿠폰이 도착했어요. 링크를 클릭하여 등록해주세요.
          </p>
          <a className={styles.anchor} href='https://naver.com' target='_blank' rel='noreferrer'>
            쿠폰 사용하러 가기!
          </a>
        </li>
        <li className={styles.noticeTitleWrapper}>
          <p className={styles.noticeTitle}>💌 Udemy 쿠폰이 도착했어요!</p>
          <p className={styles.noticeContent}>
            신청하신 강의 쿠폰이 도착했어요. 링크를 클릭하여 등록해주세요.
          </p>
          <a className={styles.anchor} href='https://naver.com' target='_blank' rel='noreferrer'>
            쿠폰 사용하러 가기!
          </a>
        </li>
      </ul>
    </div>
  );
};
