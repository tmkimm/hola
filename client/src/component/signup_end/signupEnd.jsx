import React from "react";
import styles from "./signupEnd.module.css";

const SignupEnd = ({ handleClose }) => {
  return (
    <>
      <h1 className={styles.title}>
        축하드려요! 가입되었습니다.
        <br />
        Hola에서 당신의 꿈을 코딩하세요!
      </h1>
      <button
        onClick={handleClose}
        className={styles.buttonClose}
        name="complete"
      >
        가입 완료
      </button>
    </>
  );
};

export default SignupEnd;
