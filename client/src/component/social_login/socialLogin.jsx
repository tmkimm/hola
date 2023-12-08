import React from 'react';
import styles from './socialLogin.module.css';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import GoogleButton from 'component/login_button/google_button/googleButton';
import GithubButton from 'component/login_button/github_button/githubButton';
import KakaoButton from 'component/login_button/kakao_button/kakaoButton';
import { HolaLogEvent } from 'common/GA';

const SocialLogin = ({
  googleOnSuccess,
  googleOnFailure,
  googleClientId,
  kakaoOnSuccess,
  kakaoOnFailure,
  kakaoClientId,
}) => {
  const handleClick = (method) => {
    HolaLogEvent(`login`, { category: method });
  };

  return (
    <>
      <h1 className={styles.loginTitle}>Hola에 오신 것을 환영합니다!</h1>
      <div className={styles.descriptionMobile}>소셜 계정으로 로그인하기</div>
      <section className={styles.loginWrapper}>
        <div onClick={() => handleClick('google')}>
          <GoogleLogin
            clientId={googleClientId}
            responseType={'id_token'}
            onSuccess={googleOnSuccess}
            onFailure={googleOnFailure}
            render={(renderProps) => <GoogleButton onClick={renderProps.onClick}></GoogleButton>}
          />
        </div>
        <div onClick={() => handleClick('github')}>
          <GithubButton />
        </div>
        <div onClick={() => handleClick('kakao')}>
          <KakaoLogin
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFailure={kakaoOnFailure}
            render={({ onClick }) => <KakaoButton onClick={onClick}></KakaoButton>}
          />
        </div>
      </section>
    </>
  );
};

export default SocialLogin;
