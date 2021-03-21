import React, { useState } from "react";
import styles from "./loginModal.module.css";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { fetchUserById } from "../../../store/user";
import GoogleButton from "../../login_button/google_button/googleButton";
import GithubButton from "../../login_button/github_button/githubButton";
import KakaoButton from "../../login_button/kakao_button/kakaoButton";

/* 

LoginModal Component

로그인 시도 시 가입 여부에 따라서 가입 된 유저면 모달을 닫고,
미가입된 유저면 회원가입을 진행합니다.

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
  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_API_KEY;
  const dispatch = useDispatch();

  const onSuccess = async (response) => {
    const { tokenId } = response;
    dispatch(fetchUserById(tokenId)).then((response) => {
      console.log(response);
      if (response.payload.loginSuccess === true) handleClose();
      else handleLoginStep();
    });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <h1>Hola에 오신 것을 환영합니다!</h1>
      <section className={styles.loginWrapper}>
        <GoogleLogin
          clientId={clientId}
          responseType={"id_token"}
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={(renderProps) => (
            <GoogleButton
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            ></GoogleButton>
          )}
        />
        <GithubButton></GithubButton>
        <KakaoButton></KakaoButton>
      </section>
    </>
  );
};

const SignUp = () => {
  return (
    <>
      <h1>Hola에 오신 것을 환영합니다!</h1>
      <section>
        <div className={styles.temp}>회원가입 페이지 입니다....</div>
        <div className={styles.temp}>회원가입 페이지 입니다....</div>
        <div className={styles.temp}>회원가입 페이지 입니다....</div>
      </section>
    </>
  );
};

export default LoginModal;
