import React from 'react';
import styles from './setNickname.module.css';
import TopBarContainer from 'component/top_bar_container/topBarContainer';

const SetNickname = ({ nickname, setNickname, handleLoginStep }) => {
  return (
    <>
      <TopBarContainer></TopBarContainer>
      <h1 className={styles.title}>
        Hola에 처음 오셨군요!
        <br />
        우선, 사용하실 닉네임을 설정해 볼까요?
      </h1>
      <div className={styles.inputWrapper}>
        <h3 className={styles.nicknameText}>닉네임</h3>
        <input
          className={styles.nicknameInput}
          type='text'
          name='nickNameInput'
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </div>
      <button onClick={handleLoginStep} className={styles.buttonNext} name='complete'>
        다음
      </button>
    </>
  );
};

export default SetNickname;
