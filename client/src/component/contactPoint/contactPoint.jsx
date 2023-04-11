import React from 'react';
import styles from './contactPoint.module.css';
import { toast } from 'react-toastify';

export const ContactPoint = ({ contactPoint, contactType }) => {
  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('클립보드에 복사되었어요!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (contactType.value === 'ok' || contactType.value === 'gf') {
    return (
      <div className={styles.contactWrapper}>
        <a className={styles.link} href={contactPoint} target='_blank' rel='noreferrer'>
          <span className={styles.label}>{contactType.label}</span>
          <img className={styles.linkImg} src={'/images/info/link.svg'} alt='링크' />
        </a>
      </div>
    );
  } else {
    return (
      <div className={styles.email} onClick={() => copyContent(contactPoint)}>
        <div>이메일</div>
        <img className={styles.linkImg} src={'/images/info/link.svg'} alt='링크' />
      </div>
    );
  }
};
