import React, { useState } from "react";
import styles from "./loginModal.module.css";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, addUserNickName } from "../../../store/user";
import GoogleButton from "../../login_button/google_button/googleButton";
import GithubButton from "../../login_button/github_button/githubButton";
import KakaoButton from "../../login_button/kakao_button/kakaoButton";
import { nextStep } from "../../../store/loginStep";
import UserImageUpload from "../../user_image_upload/userImageUpload";
import studyService from "../../../service/study_service";
import { getFormatedToday } from "../../../common/utils";
import LikeLanguages from "../../like_languages/likeLanguages";
import TopBar from "../../top_bar/topBar";
import SocialLoginContainer from "../../social_login_container/socialLoginContainer";
import SetNicknameContainer from "../../set_nickname_container/setNicknameContainer";
/* 

LoginModal Component

로그인 시도 시 가입 여부에 따라서 가입 된 유저면 모달을 닫고,
미가입된 유저면 회원가입을 진행합니다.

loginStep에 따라
true면 <SocialLogin>, false면 <SignUp>
component를 rendering 합니다.

to-do
꼭 modalvisible이 전역 state로 관리가 되어야 하는가?

*/
const loginProcess = {
  socialLogin: 1,
  setNickname: 2,
  setImage: 3,
  setInterest: 4,
};

const LoginModal = ({ handleClose }) => {
  const loginStep = useSelector((state) => state.loginStep.currentStep);
  const renderByLoginStep = (loginStep) => {
    switch (loginStep) {
      case loginProcess["socialLogin"]:
        return (
          <SocialLoginContainer
            handleClose={handleClose}
          ></SocialLoginContainer>
        );
      case loginProcess["setNickname"]:
        return <SetNicknameContainer />;
      default:
        return <div></div>;
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.modalHeader}>
        <img
          className={styles.logo}
          src="images/logo/hola_logo_y.png"
          alt="welcome"
        ></img>
        <div className={styles.exitWrapper} onClick={handleClose}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            tabIndex="1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
      </div>
      <div className={styles.modalContent}>{renderByLoginStep(loginStep)}</div>
    </div>
  );
};

/* 

signUp component로, 회원가입시 닉네임을 설정하는 곳입니다.

to-do
1. 중복체크 로직 추가가 필요합니다.
2. 3단계 구성이 필요합니다.
- 1. 닉네임 선택
- 2. 사진 선택
- 3. 관심분야 선택

*/

// const SignUp = ({ handleClose }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const [image, setImage] = useState(null);
//   const [isImageChanged, setIsImageChanged] = useState(false);
//   const [nickName, setNickName] = useState("");
//   const [likeLanguages, setLikeLanguages] = useState([]);
//   const onCompleteClick = async (e) => {};
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const nickName = e.target.nickName.value;
//     console.log("###########nickName:", nickName);

//     if (isImageChanged) {
//       if (image) {
//         const preSignedUrl = await studyService.getPresignedUrl(nickName);
//         const fileName = `${nickName}_${getFormatedToday()}.png`;

//         await studyService
//           .uploadImageToS3WithBase64(preSignedUrl, image, fileName)
//           .then((response) => {
//             console.log("response from uploadUserimgtoS3", response);
//           });
//       }
//     }

//     await dispatch(addUserNickName({ id: user.id, nickName, image })).then(
//       (response) => {
//         console.log("addUserNickName response :", response);
//         handleClose();
//       }
//     );
//   };
//   return (
//     <>
//       <TopBar></TopBar>
//       <h1>Hola에 처음 오셨군요! 닉네임을 설정해 보세요.</h1>
//       <UserImageUpload
//         image={image}
//         setImage={setImage}
//         setIsImageChanged={setIsImageChanged}
//       ></UserImageUpload>
//       <div className={styles.titleWrapper}>
//         <h3>닉네임</h3>
//         <input
//           type="text"
//           name="nickNameInput"
//           value={nickName}
//           onChange={(e) => {
//             setNickName(e.target.value);
//           }}
//         />
//       </div>

//       <div className={styles.titleWrapper}>
//         <h3>관심 기술 태그</h3>
//         <LikeLanguages
//           likeLanguages={likeLanguages}
//           setLikeLanguages={setLikeLanguages}
//         ></LikeLanguages>
//       </div>

//       <button
//         onClick={onCompleteClick}
//         className={styles.buttonComplete}
//         name="complete"
//       >
//         완료
//       </button>
//     </>
//   );
// };

export default LoginModal;
