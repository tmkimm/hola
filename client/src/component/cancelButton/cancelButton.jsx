import React from 'react';
import styles from './cancelButton.module.css';

/*

글 쓰기 button component입니다.
글 등록 버튼, 취소 버튼으로 구성되어 있습니다.

*/
const CancelButton = ({ onPublish, onCancel, confirmMsg, positiveMsg, negativeMsg }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>{confirmMsg}</div>
      <section className={styles.buttons}>
        <button onClick={onCancel} className={styles.cancelButton}>
          {negativeMsg}
        </button>
        <button onClick={onPublish} className={styles.registerButton}>
          {positiveMsg}
        </button>
      </section>
    </div>
  );
};

export default CancelButton;
