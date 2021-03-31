import React, { useState } from "react";
import styles from "./loginModal.module.css";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, addUserNickName } from "../../../store/user";
import GoogleButton from "../../login_button/google_button/googleButton";
import GithubButton from "../../login_button/github_button/githubButton";
import KakaoButton from "../../login_button/kakao_button/kakaoButton";

/* 

LoginModal Component

로그인 시도 시 가입 여부에 따라서 가입 된 유저면 모달을 닫고,
미가입된 유저면 회원가입을 진행합니다.

loginStep이 true면 소셜 로그인,
false면 닉네임 생성으로 갑니다.

to-do
Social Login,
Sign Up Component 분리가 필요합니다.
*/

const LoginModal = ({ handleClose }) => {
  const [loginStep, setLoginStep] = useState(true);

  const handleLoginStep = () => {
    setLoginStep(!loginStep);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalHeader}>
        <img src="images/logo/hola_logo_y.png" alt="welcome"></img>
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
      <div className={styles.modalContent}>
        {loginStep === true ? (
          <SocialLogin
            handleLoginStep={handleLoginStep}
            handleClose={handleClose}
          ></SocialLogin>
        ) : (
          <SignUp handleClose={handleClose}></SignUp>
        )}
      </div>
    </div>
  );
};

const SocialLogin = ({ handleLoginStep, handleClose }) => {
  const googleClientId = process.env.REACT_APP_GOOGLE_LOGIN_API_KEY;
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;
  const dispatch = useDispatch();

  const googleOnSuccess = async (response) => {
    const { tokenId } = response;
    console.log("#########token ID : ", tokenId);
    dispatch(fetchUserById(tokenId)).then((response) => {
      console.log("fetchByuserID response :", response);
      if (response.payload.loginSuccess === true) handleClose();
      else handleLoginStep();
    });
  };

  const googleOnFailure = (error) => {
    console.log(error);
  };

  const kakaoOnSuccess = async (response) => {
    console.log(response);
  };

  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <h1>Hola에 오신 것을 환영합니다!</h1>
      <section className={styles.loginWrapper}>
        <GoogleLogin
          clientId={googleClientId}
          responseType={"id_token"}
          onSuccess={googleOnSuccess}
          onFailure={googleOnFailure}
          render={(renderProps) => (
            <GoogleButton
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            ></GoogleButton>
          )}
        />
        <GithubButton></GithubButton>
        <KakaoLogin
          token={kakaoClientId}
          onSuccess={kakaoOnSuccess}
          onFailure={kakaoOnFailure}
          render={({ onClick }) => (
            <KakaoButton onClick={onClick}></KakaoButton>
          )}
        />
      </section>
    </>
  );
};

/* 

signUp component로, 회원가입시 닉네임을 설정하는 곳입니다.

to-do
1. 중복체크 로직 추가가 필요합니다.
2. image carousel slider 추가가 필요합니다.

*/

const SignUp = ({ handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nickName = e.target.nickName.value;
    console.log("###########nickName:", nickName);
    const userInfo = {
      id: user.id,
      nickName,
    };
    dispatch(addUserNickName(userInfo)).then((response) => {
      console.log("addUserNickName response :", response);
      handleClose();
    });
  };
  return (
    <>
      <h1>Hola에 처음 오셨군요! 닉네임을 설정해 보세요.</h1>
      <form onSubmit={handleSubmit}>
        <label>
          닉네임 :
          <input type="text" name="nickName" />
        </label>
        <input type="submit" value="회원가입" />
      </form>
    </>
  );
};

export default LoginModal;
