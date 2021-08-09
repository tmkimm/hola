import React from "react";
import styles from "./notFound.module.css";
import { useHistory } from "react-router-dom";

/* to-do

반응형 처리 필요 

*/

const NotFound = () => {
  const history = useHistory();

  const handleOnclick = () => {
    history.push("/");
  };

  return (
    <div className={styles.notFoundWrapper}>
      <img
        className={styles.errorImg}
        src="/images/info/notFound.png"
        alt="error"
      />
      <div className={styles.message}>요청하신 페이지를 찾을 수 없어요.</div>

      <button className={styles.homeButton} onClick={handleOnclick}>
        홈으로 가기
      </button>
    </div>
  );
};

export default NotFound;
