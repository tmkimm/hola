import React from "react";
import styles from "./setNickname.module.css";
import TopBarContainer from "../top_bar_container/topBarContainer";

const SetNickname = ({ nickname, setNickname, handleLoginStep }) => {
  return (
    <>
      <TopBarContainer></TopBarContainer>
      <h1>Hola에 처음 오셨군요! 환영합니다.</h1>
      <h1>Hola에서 사용할 닉네임을 입력해 주세요.</h1>
      <div className={styles.titleWrapper}>
        <h3>닉네임</h3>
        <input
          type="text"
          name="nickNameInput"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </div>
      <button
        onClick={handleLoginStep}
        className={styles.buttonComplete}
        name="complete"
      >
        다음
      </button>
    </>
  );
};

export default SetNickname;
