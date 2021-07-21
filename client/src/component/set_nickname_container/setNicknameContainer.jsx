import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nextStep, setSignUpUser } from "../../store/loginStep";
import SetNickname from "../set_nickname/setNickname";
import { toast } from "react-toastify";

const SetNicknameContainer = (props) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");

  const handleLoginStep = async () => {
    // 닉네임이 겹치면 빨간글씨로 띄워주자
    //const response = await userService.checkNickname(nickname);
    //console.log("nickname중복 검사!!", response);
    console.log(nickname.length);
    if (nickname.length > 15) {
      toast.info("닉네임은 최대 15글자 입니다.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

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
