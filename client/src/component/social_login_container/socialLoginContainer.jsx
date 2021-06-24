import React from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../store/loginStep";
import SocialLogin from "../social_login/socialLogin";
import { fetchUserById } from "../../store/user";

const SocialLoginContainer = ({ handleClose }) => {
  const googleClientId = process.env.REACT_APP_GOOGLE_LOGIN_API_KEY;
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;
  const dispatch = useDispatch();

  const handleLoginStep = () => {
    dispatch(nextStep("SIGNUP"));
  };

  const googleOnSuccess = async (response) => {
    const { tokenId } = response;
    const userData = { code: tokenId, social: "google" };

    dispatch(fetchUserById(userData)).then((response) => {
      console.log("fetchByuserID response :", response);
      if (response.payload.loginSuccess === true) handleClose();
      else handleLoginStep();
    });
  };

  const googleOnFailure = (error) => {
    console.log(error);
  };

  const kakaoOnSuccess = async (data) => {
    const accessToken = data.response.access_token;
    const userData = { code: accessToken, social: "kakao" };

    await dispatch(fetchUserById(userData)).then((response) => {
      console.log("fetchByuserID response :", response);
      if (response.payload.loginSuccess === true) handleClose();
      else handleLoginStep();
    });
  };

  const kakaoOnFailure = (error) => {
    console.log(error);
  };
  return (
    <SocialLogin
      googleOnSuccess={googleOnSuccess}
      googleOnFailure={googleOnFailure}
      googleClientId={googleClientId}
      kakaoOnSuccess={kakaoOnSuccess}
      kakaoOnFailure={kakaoOnFailure}
      kakaoClientId={kakaoClientId}
    ></SocialLogin>
  );
};

export default SocialLoginContainer;
