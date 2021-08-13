import React from "react";
import LikeLanguages from "../like_languages/likeLanguages";
import TopBarContainer from "../top_bar_container/topBarContainer";
import styles from "./setInterest.module.css";
const SetInterest = ({
  loginStep,
  handleLoginStep,
  likeLanguages,
  setLikeLanguages,
}) => {
  return (
    <>
      <TopBarContainer></TopBarContainer>
      <h1 className={styles.title}>
        {loginStep.nickName}님, 반가워요.
        <br />
        어떤 언어, 프레임워크에 관심이 있는지 알려주세요!
      </h1>
      <div className={styles.titleText}>
        관심 태그를 기반으로 소식을 추천해드려요.
      </div>
      <div className={styles.inputWrapper}>
        <h3>관심 기술 태그</h3>
        <div className={styles.likeLanguageWrapper}>
          <LikeLanguages
            placeholder={"관심 태그 선택"}
            likeLanguages={likeLanguages}
            setLikeLanguages={setLikeLanguages}
          ></LikeLanguages>
        </div>
      </div>

      <button
        onClick={handleLoginStep}
        className={styles.buttonNext}
        name="complete"
      >
        다음
      </button>
    </>
  );
};

export default SetInterest;
