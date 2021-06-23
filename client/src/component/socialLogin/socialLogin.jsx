import React from "react";
import styles from "./socialLogin.module.css";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import GoogleButton from "../login_button/google_button/googleButton";
import GithubButton from "../login_button/github_button/githubButton";
import KakaoButton from "../login_button/kakao_button/kakaoButton";

const SocialLogin = ({
  googleOnSuccess,
  googleOnFailure,
  googleClientId,
  kakaoOnSuccess,
  kakaoOnFailure,
  kakaoClientId,
}) => {
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

export default SocialLogin;
