import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../store/loginStep";
import { setUser } from "../../store/user";
import SetNickname from "../set_nickname/setNickname";

const SetNicknameContainer = (props) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  // nickname 겹치는지 확인 필요

  const handleLoginStep = () => {
    // 닉네임이 겹치면 빨간글씨로 띄워주자
    dispatch(setUser(nickname));
    dispatch(nextStep("SETIMAGE"));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const nickname = e.target.nickname.value;
  //   dispatch(setUser(nickname));
  // };

  return (
    <SetNickname
      setNickname={setNickname}
      handleLoginStep={handleLoginStep}
      nickname={nickname}
    ></SetNickname>
  );
};

export default SetNicknameContainer;
