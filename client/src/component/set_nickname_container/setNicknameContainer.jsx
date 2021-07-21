import React, { useState } from "react";
import { useDispatch } from "react-redux";
import userService from "../../service/user_service";
import { nextStep, setSignUpUser } from "../../store/loginStep";
import SetNickname from "../set_nickname/setNickname";

const SetNicknameContainer = (props) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");

  const handleLoginStep = async () => {
    // 닉네임이 겹치면 빨간글씨로 띄워주자
    //const response = await userService.checkNickname(nickname);
    //console.log("nickname중복 검사!!", response);
    dispatch(setSignUpUser({ key: "nickName", value: nickname }));
    dispatch(nextStep());
  };

  return (
    <SetNickname
      setNickname={setNickname}
      handleLoginStep={handleLoginStep}
      nickname={nickname}
    ></SetNickname>
  );
};

export default SetNicknameContainer;
