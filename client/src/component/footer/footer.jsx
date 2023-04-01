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
        <a href=''>이용약관</a>
        <a href=''>개인정보처리방침</a>
        <a href=''>서비스소개</a>
        <a href=''>광고상품 소개</a>
      </div>
    </footer>
  );
};

export default Footer;
