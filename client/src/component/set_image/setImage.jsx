import React from "react";
import styles from "./setImage.module.css";
import UserImageUpload from "../user_image_upload/userImageUpload";
import TopBarContainer from "../top_bar_container/topBarContainer";

const SetImage = ({
  loginStep,
  isImageChanged,
  setIsImageChanged,
  userImage,
  setUserImage,
  handleLoginStep,
}) => {
  return (
    <>
      <TopBarContainer></TopBarContainer>
      <h1 className={styles.title}>
        {loginStep.nickName}님만의 특별한 이미지를 설정해 보세요. <br />
        물론, 언제든지 변경할 수 있어요!
      </h1>
      <div className={styles.text}>
        미 업로드시 기본 이미지로 자동 설정됩니다.
      </div>
      <UserImageUpload
        image={userImage}
        setImage={setUserImage}
        setIsImageChanged={setIsImageChanged}
      ></UserImageUpload>

      <button
        onClick={handleLoginStep}
        className={styles.buttonNext}
        name="complete"
      >
        가입 완료
      </button>
    </>
  );
};

export default SetImage;
