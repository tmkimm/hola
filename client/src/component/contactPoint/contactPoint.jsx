import React from 'react';
import styles from './contactPoint.module.css';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { HolaLogEvent } from 'common/GA';

export const ContactPoint = ({ title, contactPoint, contactType }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const copyContent = async (text) => {
    HolaLogEvent(`apply_email`, { category: title });
    try {
      await navigator.clipboard.writeText(text);
      toast.success('클립보드에 주소가 복사되었어요!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      toast.error('복사에 실패했어요! 잠시후 다시 시도해보세요.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  if (contactType.value === 'ok' || contactType.value === 'gf') {
    return (
      <div className={styles.contactWrapper}>
        {isMobile ? (
          <div className={styles.contactContainer}>
            <span className={styles.label}>{contactType.label}</span>
          </div>
        ) : (
          <a
            onClick={() => {
              HolaLogEvent(`apply_${contactType.value}`, { category: title });
            }}
            className={styles.link}
            href={contactPoint}
            target='_blank'
            rel='noreferrer'
          >
            <span className={styles.label}>{contactType.label}</span>
            <img className={styles.linkImg} src={'/images/info/link.svg'} alt='링크' />
          </a>
        )}
      </div>
    );
  } else {
    return (
      <>
        {isMobile ? (
          <div className={styles.emailMobile} onClick={() => copyContent(contactPoint)}>
            <div>이메일</div>
          </div>
        ) : (
          <div className={styles.email} onClick={() => copyContent(contactPoint)}>
            <div>이메일</div>
            <img className={styles.linkImg} src={'/images/info/link.svg'} alt='링크' />
          </div>
        )}
      </>
    );
  }
};
