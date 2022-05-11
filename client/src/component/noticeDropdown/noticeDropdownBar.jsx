import React, { useState } from 'react';
import styles from './noticeDropdownBar.module.css';

export const NoticeDropdownBar = ({ handleClose }) => {
  const [test, setTest] = useState(false);
  const isRead = true;
  return (
    <div className={styles.noticeWrapper}>
      <div className={styles.noticeHeader}>
        <span classname={styles.title}>읽지 않은 알림 (1) </span>
        <div className={styles.exitWrapper} onClick={handleClose}>
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            tabIndex='1'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
          </svg>
        </div>
      </div>
      {test ? (
        <div className={styles.empty}>알림함이 비어있습니다.</div>
      ) : (
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
          <li className={`${styles.noticeTitleWrapper} ${isRead && styles.isRead}`}>
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
      )}
    </div>
  );
};
