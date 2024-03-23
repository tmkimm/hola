import React from 'react';
import styles from './writebutton.module.css';

/*

글 쓰기 button component입니다.
글 등록 버튼, 취소 버튼으로 구성되어 있습니다.

*/

const Writebutton = ({ onPublish, onCancel }) => {
  return (
    <section className={styles.buttons}>
      <button onClick={onCancel} className={styles.cancelButton}>
        취소
      </button>
      <button onClick={onPublish} className={styles.registerButton}>
        글 등록
      </button>
    </section>
  );
};

export default Writebutton;
