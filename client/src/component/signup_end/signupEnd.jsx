import React from 'react';
import styles from './signupEnd.module.css';
import { HolaLogEvent } from 'common/GA';

const SignupEnd = ({ handleClose }) => {
  return (
    <>
      <h1 className={styles.title}>
        축하드려요! 가입되었습니다.
        <br />
        Hola에서 동료를 구해보세요!
      </h1>
      <img className={styles.logo} src='/images/logo/hola_logo_y.png' alt='logo' />
      <button
        onClick={() => {
          HolaLogEvent('sign_up_complete', { category: 'complete' });
          handleClose();
        }}
        className={styles.buttonClose}
        name='complete'
      >
        시작하기
      </button>
    </>
  );
};

export default SignupEnd;
