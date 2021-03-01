import React from "react";
import styles from "./banner.module.css";

const Banner = (props) => (
  <section className={styles.banner}>
    <div className={styles.mainBanner}>
      <h1 className={styles.title}>
        스터디와
        <br /> 사이드 프로젝트를
        <br /> 찾는 가장 쉬운 방법
        <br /> Hola!{" "}
        <span className={styles.weak}>에서 함께 할 개발자를 찾으세요.</span>
      </h1>
      <div className={styles.mainImg}>
        <img
          className={styles.mainImgs}
          src="images/logo/main.png"
          alt="main logo"
        />
      </div>
    </div>
  </section>
);

export default Banner;
