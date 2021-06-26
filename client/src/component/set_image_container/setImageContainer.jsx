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
    const nickName = loginStep.nickname;
    const id = loginStep.id;
    if (isImageChanged) {
      if (userImage) {
        const preSignedUrl = await studyService.getPresignedUrl(nickName);
        const fileName = `${nickName}_${getFormatedToday()}.png`;

        await studyService
          .uploadImageToS3WithBase64(preSignedUrl, userImage, fileName)
          .then((response) => {
            console.log("response from uploadUserimgtoS3", response);
          });
      }
    }

    await dispatch(addUserNickName({ id, nickName, image: userImage })).then(
      (response) => {
        console.log("addUserNickName response :", response);
        //handleClose();
      }
    );
  };
  return (
    <SetImage
      loginStep={loginStep}
      isImageChanged={isImageChanged}
      setIsImageChanged={setIsImageChanged}
      userImage={userImage}
      setUserImage={setUserImage}
      handleLoginStep={handleLoginStep}
    ></SetImage>
  );
};

export default SetImageContainer;
