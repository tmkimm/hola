import React, { useState } from "react";
import SetImage from "../set_image/setImage";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setSignUpUser } from "../../store/loginStep";
import studyService from "../../service/study_service";
import { getFormatedToday } from "../../common/utils";
import { addUserNickName } from "../../store/user";

const SetImageContainer = (props) => {
  const dispatch = useDispatch();
  const loginStep = useSelector((state) => state.loginStep);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const handleLoginStep = () => {
    dispatch(setSignUpUser({ key: "image", value: userImage }));
    dispatch(nextStep());
  };

  const handleSignUp = async () => {
    const nickName = loginStep.nickName;
    const id = loginStep.id;
    const likeLanguages = loginStep.likeLanguages;

    if (isImageChanged) {
      if (userImage) {
        const { preSignedUrl, fileName } = await studyService.getPresignedUrl(
          nickName
        );
        dispatch(setSignUpUser({ key: "image", value: fileName }));

        const response = await studyService.uploadImageToS3WithBase64(
          preSignedUrl,
          userImage,
          fileName
        );
        console.log("response from uploadUserimgtoS3", response);
      }
    }

    console.log("id from loginstep", id); // 이게 가끔 안나오는데, 확인 필요

    const response = await dispatch(
      addUserNickName({ id, nickName, likeLanguages, image: loginStep.image })
    );
    console.log("addUserNickName response :", response);
    dispatch(nextStep());
  };

  return (
    <SetImage
      loginStep={loginStep}
      isImageChanged={isImageChanged}
      setIsImageChanged={setIsImageChanged}
      userImage={userImage}
      setUserImage={setUserImage}
      handleLoginStep={handleSignUp}
    ></SetImage>
  );
};

export default SetImageContainer;
