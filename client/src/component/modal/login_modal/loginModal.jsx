import React, { useState } from "react";
import styles from "./loginModal.module.css";
import GoogleLogin from "react-google-login";

const LoginModal = ({ handleClose }) => {
  const clientId =
    "883481629680-maq49j99rprpqk2p1ujsd6mli0tp7lpg.apps.googleusercontent.com";
  const onSuccess = async (response) => {
    console.log("###########Response#########");
    console.log(response);

    const {
      googleId,
      profileObj: { email, name },
    } = response;

    /*
        await onSocial({
            socialId : googleId,
            socialType : 'google',
            email,
            nickname : name
        });
        */
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div class={styles.wrapper}>
      <div class={styles.grayBlock}>
        <div>
          <img src="images/logo/hola_logo_y.png" alt="welcome"></img>
        </div>
      </div>
      <div class={styles.whiteBlock}>
        <div class={styles.exitWrapper} onClick={handleClose}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            tabindex="1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
        <div>
          <GoogleLogin
            clientId={clientId}
            responseType={"id_token"}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText={"Google 계정으로 로그인하기"}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
