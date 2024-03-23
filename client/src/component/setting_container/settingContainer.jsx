import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { languageList } from '../../common/options';
import userService from 'service/user_service';
import studyService from 'service/study_service';
import { clearUser } from 'store/user';
import { clearStep } from 'store/loginStep';
import { modifyUserInfo } from 'store/user';
import Setting from 'page/setting/setting';

const SettingContainer = (props) => {
  const user = useSelector((state) => state.user);
  const [nickName, setNickName] = useState(user.nickName);
  const preNickName = user.nickName;
  const [likeLanguages, setLikeLanguages] = useState(user.likeLanguages);
  const [image, setImage] = useState(user.imageUrl);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user.id === undefined) {
      toast.error('로그인이 필요한 페이지입니다.', {
        position: 'top-right',
        autoClose: 3000,
      });
      history.push('/');
    }
  }, [history, user.id, user.nickName]);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setShowPopup((state) => !state);
  };
  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setShowPopup((state) => !state);
  };

  if (likeLanguages.length > 0 && !likeLanguages[0].hasOwnProperty('value')) {
    const userLanguage = user.likeLanguages.map((obj) => ({
      value: obj,
      label: languageList.find((element) => element.value === obj).label,
    }));
    setLikeLanguages(userLanguage);
  }

  // 변경 완료 버튼
  const onCompleteClick = async () => {
    if (!nickName) {
      toast.error('닉네임을 입력해 주세요!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else if (nickName.length > 15) {
      toast.error('닉네임은 15자 아래로 입력해주세요!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      let payload = {
        id: user.id,
        likeLanguages: likeLanguages.map((element) => element.value),
      };

      //닉네임 변경
      if (nickName !== preNickName) {
        const response = await userService.checkNickname(user.id, nickName);
        if (response.isExists) {
          toast.info('닉네임이 중복 되었어요!', {
            position: 'top-right',
            autoClose: 3000,
          });
          return;
        }
        payload.nickName = nickName;
      }

      // 이미지 변경
      if (isImageChanged) {
        if (image) {
          const { preSignedUrl, fileName } = await studyService.getPresignedUrl(nickName);

          await studyService.uploadImageToS3WithBase64(preSignedUrl, image, fileName);

          payload.image = fileName;
        } else payload.image = 'default.PNG';
      }

      dispatch(modifyUserInfo(payload)).then((response) => {
        toast.success('변경이 완료되었어요!', {
          position: 'top-right',
          autoClose: 3000,
        });
        history.push('/');
      });
    }
  };

  // 회원 탈퇴
  const onSignOutClick = async (e) => {
    const deleteResult = userService.deleteUser(user.id);
    if (deleteResult) {
      toast.success('회원 탈퇴가 완료되었어요!', {
        position: 'top-right',
        autoClose: 3000,
      });
      localStorage.removeItem('userName');
      dispatch(clearUser());
      dispatch(clearStep());
      document.body.style.overflow = 'auto';
      history.push('/');
    } else {
      toast.error('회원 탈퇴에 실패하였어요! 잠시 후 다시 시도해주세요.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <Setting
      nickName={nickName}
      setNickName={setNickName}
      likeLanguages={likeLanguages}
      setLikeLanguages={setLikeLanguages}
      image={image}
      setImage={setImage}
      isImageChanged={isImageChanged}
      setIsImageChanged={setIsImageChanged}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      openModal={openModal}
      closeModal={closeModal}
      onCompleteClick={onCompleteClick}
      onSignOutClick={onSignOutClick}
    ></Setting>
  );
};

export default SettingContainer;
