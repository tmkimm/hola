import React from 'react';
import styles from './notice.module.css';

export const Notice = () => {
  return (
    <img className={styles.notification} src={'/images/info/notification.svg'} alt='notification' />
  );
};
