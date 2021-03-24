import React from "react";
import styles from "./banner.module.css";

const Banner = (props) => (
  <section className={styles.banner}>
    <div className={styles.bannerContent}>
      <h1 className={styles.title}>
        스터디와 <br />
        사이드 프로젝트를 <br />
        찾는 가장 쉬운 방법
      </h1>
      <div className={styles.subBanner}>
        <div className={styles.subImgWrapper}>
          <img
            className={styles.subImg}
            src="images/logo/hola_logo_y.png"
            alt="sub logo"
          />
        </div>
        <span className={styles.weak}>에서 함께 할 팀원을 찾아보세요.</span>
      </div>
    </div>
    <div className={styles.bannerImg}>
      <img
        className={styles.mainImg}
        src="images/logo/main.png"
        alt="main logo"
      />
    </div>
  </section>
);

export default Banner;
