import React from 'react';
import styles from './avatar.module.css';

export const Avatar = React.memo(({ imgPath, userName, size }) => {
  const displaySize = size === 'small' ? styles.small : styles.large;
  const defaultImage = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG';
  return (
    <div className={styles.user}>
      <img
        className={`${styles.userImg} ${displaySize}`}
        src={imgPath || defaultImage}
        alt='avatar'
      />
      <div className={styles.userName}>{userName}</div>
    </div>
  );
});
