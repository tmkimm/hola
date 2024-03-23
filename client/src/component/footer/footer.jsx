import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftCover}>
        <img className={styles.footerImg} src='images/logo/footer.png' alt='footer logo' />
        <div className={styles.contactInfo}>
          <div className={styles.title}>Contact</div>
          <div className={styles.mail}>team.hola.official@gmail.com</div>
        </div>
        <div className={styles.copyright}>Copyright Hola. All rights reserved</div>
      </div>
      <div className={styles.rightCover}>
        <a
          href='https://temporal-weather-18e.notion.site/95f676cba1a245bf843ffa6a6f7933dd'
          target='_blank'
          rel='noreferrer'
        >
          이용약관
        </a>
        <a
          href='https://temporal-weather-18e.notion.site/f8bced09dea34b6caa11251eb8b8f1ef'
          target='_blank'
          rel='noreferrer'
        >
          개인정보처리방침
        </a>
        <a
          href='https://temporal-weather-18e.notion.site/Hola-_______-613200b663ab47b2b59c8c5cf0011b2f'
          target='_blank'
          rel='noreferrer'
        >
          서비스소개
        </a>
        <a href='https://tally.so/r/w4rWyX' target='_blank' rel='noreferrer'>
          광고상품 소개
        </a>
      </div>
    </footer>
  );
};

export default Footer;
