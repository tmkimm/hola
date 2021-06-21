import React from "react";
import styles from "./cancelButton.module.css";

/*

글 쓰기 button component입니다.
글 등록 버튼, 취소 버튼으로 구성되어 있습니다.

*/
const CancelButton = ({ onPublish, onCancel }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>작성하신 글을 삭제 하시겠어요?</div>
      <section className={styles.buttons}>
        <button onClick={onCancel} className={styles.cancelButton}>
          아니요
        </button>
        <button onClick={onPublish} className={styles.registerButton}>
          네, 삭제할래요
        </button>
      </section>
    </div>
  );
};

export default CancelButton;
