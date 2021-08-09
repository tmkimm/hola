import React from "react";
import styles from "./emptyList.module.css";

const EmptyList = () => {
  return (
    <div className={styles.emptyImgWrapper}>
      <img
        className={styles.emptyImg}
        src="/images/info/empty.png"
        alt="emptyList"
      />
      <div className={styles.textWrapper}>
        <span className={styles.text}>앗! 찾으시는 글이 아직 없네요.</span>
        <span className={styles.text}>직접 모집해볼까요?</span>
      </div>
    </div>
  );
};

export default EmptyList;
