import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import languageList from "../../languageList";
import userService from "../../service/user_service";
import studyService from "../../service/study_service";
import { clearUser } from "../../store/user";
import { clearStep } from "../../store/loginStep";
import { modifyUserInfo } from "../../store/user";
import Setting from "../../page/setting/setting";

/*
// TODO
이미지 컴포넌트로 분리
s3 경로 config 파일로 분리

사용자 정보 API로 넘길때 
=> [React, NodeJs]와 같이 일반 배열 형태

Input 표현을 위해 LikeLanguages Component로 넘길때
=> {value, label} 형태로 되어있음

가끔 Can't perform a react state 나오는데, 이거 useEffect cleanUp 함수로 해결가능한지 확인
해결법 => useState에 isMount 설정을 하고, useEffect에서 cleanUp function으로 isMount off 시켜준 뒤
input에 state 바꿀때는 isMount가 true일때만 하기

*/
const SettingContainer = (props) => {
  const user = useSelector((state) => state.user);
  const [nickName, setNickName] = useState(user.nickName);
  const preNickName = user.nickname;
  const [likeLanguages, setLikeLanguages] = useState(user.likeLanguages);
  const [image, setImage] = useState(user.imageUrl);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user.id === undefined || user.nickName === "Guest") {
      toast.error("로그인이 필요한 페이지입니다.", {
        position: "top-right",
        autoClose: 3000,
      });
      history.push("/");
    }
  }, [history, user.id, user.nickName]);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShowPopup((state) => !state);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowPopup((state) => !state);
  };

  if (likeLanguages.length > 0 && !likeLanguages[0].hasOwnProperty("value")) {
    const userLanguage = user.likeLanguages.map((obj) => ({
      value: obj,
      label: languageList.find((element) => element.value === obj).label,
    }));
    setLikeLanguages(userLanguage);
  }

  // 변경 완료 버튼
  const onCompleteClick = async () => {
    if (!nickName) {
      toast.error("닉네임을 입력해 주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (nickName.length > 15) {
      toast.error("닉네임은 15자 아래로 입력해주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      let payload = {
        id: user.id,
        likeLanguages: likeLanguages.map((element) => element.value),
      };

      //닉네임 변경
      if (nickName !== preNickName) payload.nickName = nickName;

      // 이미지 변경
      if (isImageChanged) {
        if (image) {
          const { preSignedUrl, fileName } = await studyService.getPresignedUrl(
            nickName
          );

          await studyService.uploadImageToS3WithBase64(
            preSignedUrl,
            image,
            fileName
          );

          payload.image = fileName;
        } else payload.image = "default.PNG";
      }

      dispatch(modifyUserInfo(payload)).then((response) => {
        if (response.payload) {
          toast.success("변경이 완료되었습니다.", {
            position: "top-right",
            autoClose: 3000,
          });
          history.push("/");
        } else {
          toast.error("닉네임이 중복되었습니다.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
    }
  };

  // 회원 탈퇴
  const onSignOutClick = async (e) => {
    const deleteResult = userService.deleteUser(user.id);
    if (deleteResult) {
      toast.success("회원 탈퇴가 완료되었어요!", {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.removeItem("userName");
      dispatch(clearUser());
      dispatch(clearStep());
      document.body.style.overflow = "auto";
      history.push("/");
    } else {
      toast.error("회원 탈퇴에 실패하였어요! 잠시 후 다시 시도해주세요.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Setting
      nickName={nickName}
      setNickName={setNickName}
      preNickName={preNickName}
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
