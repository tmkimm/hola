import React, { useState } from 'react';
import SetImage from '../set_image/setImage';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '../../store/loginStep';
import studyService from '../../service/study_service';
import { addUserNickName } from '../../store/user';

const SetImageContainer = (props) => {
  const dispatch = useDispatch();
  const loginStep = useSelector((state) => state.loginStep);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const handleSignUp = async () => {
    const nickName = loginStep.nickName;
    const id = loginStep.id;
    const likeLanguages = loginStep.likeLanguages;
    let image = '';
    if (isImageChanged) {
      if (userImage) {
        const { preSignedUrl, fileName } = await studyService.getPresignedUrl(nickName);
        image = fileName;

        await studyService.uploadImageToS3WithBase64(preSignedUrl, userImage, fileName);
      }
    } else {
      image = 'default.PNG';
    }

    dispatch(
      addUserNickName({
        id,
        nickName,
        likeLanguages,
        image,
      }),
    );

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
