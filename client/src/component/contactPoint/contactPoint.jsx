import React from 'react';
import styles from './contactPoint.module.css';

export const ContactPoint = ({ contactPoint, contactType }) => {
  if (contactType.value === 'ok' || contactType.value === 'gf') {
    return (
      <div className={styles.contactWrapper}>
        <a className={styles.link} href={contactPoint} target='_blank' rel='noreferrer'>
          <span className={styles.label}>{contactType.label}</span>
          <img className={styles.linkImg} src={'/images/info/link.svg'} alt='' />
        </a>
      </div>
    );
  } else {
    return <div className={styles.email}>{contactPoint}</div>;
  }
};
