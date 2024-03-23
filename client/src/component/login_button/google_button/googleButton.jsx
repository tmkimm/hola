import React from 'react';
import styles from './googleButton.module.css';

const GoogleButton = ({ onClick }) => (
  <div className={styles.buttonWrapper}>
    <button className={styles.button} onClick={onClick}>
      <svg width='50' height='50' fill='none' viewBox='0 0 20 20'>
        <path
          fill='#4285F4'
          d='M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.92-.725 2.303-2.084 3.233l-.02.124 3.028 2.292.21.02c1.926-1.738 3.037-4.296 3.037-7.33z'
        ></path>
        <path
          fill='#34A853'
          d='M10.2 19.931c2.753 0 5.064-.886 6.753-2.414l-3.218-2.436c-.862.587-2.017.997-3.536.997a6.126 6.126 0 0 1-5.801-4.141l-.12.01-3.148 2.38-.041.112c1.677 3.256 5.122 5.492 9.11 5.492z'
        ></path>
        <path
          fill='#FBBC05'
          d='M4.398 11.937a6.008 6.008 0 0 1-.34-1.971c0-.687.125-1.351.329-1.971l-.006-.132-3.188-2.42-.104.05A9.79 9.79 0 0 0 .001 9.965a9.79 9.79 0 0 0 1.088 4.473l3.309-2.502z'
        ></path>
        <path
          fill='#EB4335'
          d='M10.2 3.853c1.914 0 3.206.809 3.943 1.484l2.878-2.746C15.253.985 12.953 0 10.199 0 6.211 0 2.766 2.237 1.09 5.492l3.297 2.503A6.152 6.152 0 0 1 10.2 3.853z'
        ></path>
      </svg>
    </button>
    <p className={styles.loginDescription}>Google 로그인</p>
  </div>
);

export default GoogleButton;
