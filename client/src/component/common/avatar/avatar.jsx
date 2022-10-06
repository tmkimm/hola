import React from 'react';
import styles from './avatar.module.css';

export const Avatar = React.memo(({ imgPath, size }) => {
  const defaultImage = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG';
  const imagePath =
    imgPath === 'default.PNG'
      ? defaultImage
      : `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${imgPath}`;
  return (
    <div className={styles.user}>
      <img className={styles.userImg} height={size} src={imagePath} alt='avatar' />
    </div>
  );
});
