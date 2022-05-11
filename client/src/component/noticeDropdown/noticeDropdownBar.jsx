import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import userService from 'service/user_service';
import { setUser } from 'store/user';
import styles from './noticeDropdownBar.module.css';

export const NoticeDropdownBar = ({ handleClose }) => {
  const [alarms, setAlarms] = useState([]);
  const dispatch = useDispatch();
  const getUnreadAlarmLength = (alarms) => {
    return alarms.filter((alarm) => alarm.isRead === false).length;
  };

  const handleAlarmClick = async (id) => {
    const result = await userService.readAlarm(id);
    if (getUnreadAlarmLength(alarms) === 1 && result.status === 200) {
      dispatch(setUser({ key: 'hasUnreadNotice', value: false }));
    }
  };

  useEffect(() => {
    const fetchAlarm = async () => {
      const response = await userService.getUserAlarm();
      setAlarms(response.data);
    };
    fetchAlarm();
  }, []);

  return (
    <div className={styles.noticeWrapper}>
      <div className={styles.noticeHeader}>
        <span className={styles.title}>읽지 않은 알림 ({getUnreadAlarmLength(alarms)}) </span>
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
      {alarms.length === 0 ? (
        <div className={styles.empty}>알림함이 비어있습니다.</div>
      ) : (
        <ul className={styles.noticeBody}>
          {alarms.map((alarm) => (
            <li
              key={alarm._id}
              onClick={() => handleAlarmClick(alarm._id)}
              className={`${styles.noticeTitleWrapper} ${alarm.isRead && styles.isRead}`}
            >
              <a className={styles.noticeLink} href={alarm.href} target='_blank' rel='noreferrer'>
                <p className={styles.noticeTitle}>{alarm.title}</p>
                <p className={styles.noticeContent}>{alarm.content}</p>
                <span className={styles.noticeText}>
                  {alarm.noticeType === 'coupon' ? '쿠폰 사용하러 가기!' : '모집글 양식 확인하기'}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
