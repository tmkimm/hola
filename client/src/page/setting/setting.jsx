import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import styles from "./setting.module.css";
import Navbar from "../../component/nav_bar/navbar";
import languageList from "../../languageList";
import userService from "../../service/user_service";
import studyService from "../../service/study_service";
import { clearUser } from "../../store/user";
import { clearStep } from "../../store/loginStep";
import { modifyUserInfo } from "../../store/user";
import LikeLanguages from "../../component/like_languages/likeLanguages";
import UserImageUpload from "../../component/user_image_upload/userImageUpload";
import Modal from "../../component/modal/modal_component/modal";
import CancelButton from "../../component/cancelButton/cancelButton";

/*
// TODO
이미지 컴포넌트로 분리
s3 경로 config 파일로 분리

getPresignedUrl과 사용하는 filename 맞춰야함(분 달라지면 파일 못찾음)

사용자 정보 API로 넘길때 
=> [React, NodeJs]와 같이 일반 배열 형태

Input 표현을 위해 LikeLanguages Component로 넘길때
=> {value, label} 형태로 되어있음

가끔 Can't perform a react state 나오는데, 이거 useEffect cleanUp 함수로 해결가능한지 확인
해결법 => useState에 isMount 설정을 하고, useEffect에서 cleanUp function으로 isMount off 시켜준 뒤
input에 state 바꿀때는 isMount가 true일때만 하기

*/
const Setting = (props) => {
  const [id, setID] = useState("");
  const [nickName, setNickName] = useState("");
  const [preNickName, setPreNickName] = useState("");
  const [likeLanguages, setLikeLanguages] = useState([]);
  const [image, setImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShowPopup((state) => !state);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowPopup((state) => !state);
  };
  // 사용자 정보 세팅
  useEffect(() => {
    // console.log('id : ',user.id);
    // console.log('nickname: ',user.nickName);
    // console.log('lang': user.);

    if (user.nickName) {
      userService
        .getUserInfoByNickName(user.nickName) // 이 api 의미 있나? user redux에서 가져오면 되는데?
        .then((response) => {
          const userInfo = response.data;

          if (userInfo.likeLanguages.length > 0) {
            const userLanguage = userInfo.likeLanguages.map((obj) => ({
              value: obj,
              label: languageList.find((element) => element.value === obj)
                .label,
            }));
            setLikeLanguages(userLanguage);
          }
          setID(userInfo._id);
          setNickName(userInfo.nickName);
          setPreNickName(userInfo.nickName);
          if (userInfo.image) {
            setImage(userInfo.image);
          }
        })
        .catch(console.error);
    }
  }, [user.nickName]);

  // 변경 완료 버튼
  const onCompleteClick = async (e) => {
    if (!nickName) {
      toast.error("닉네임을 입력해야 합니다.", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      let payload = {
        id,
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
    const deleteResult = userService.deleteUser(id);
    if (deleteResult) {
      toast.success("회원 탈퇴가 완료되었어요!", {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.removeItem("userName");
      dispatch(clearUser());
      dispatch(clearStep());
      history.push("/");
    } else {
      toast.error("회원 탈퇴에 실패하였어요! 잠시 후 다시 시도해주세요.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Navbar showRegisterButton={true}></Navbar>
      <div className={styles.main}>
        <h1>내 정보 수정</h1>
        <UserImageUpload
          image={image}
          setImage={setImage}
          setIsImageChanged={setIsImageChanged}
        ></UserImageUpload>
        <div className={styles.titleWrapper}>
          <h3>닉네임</h3>
          <input
            type="text"
            name="nickNameInput"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
        </div>
        <p className={styles.description}>Hola에서 사용되는 이름입니다.</p>
        <hr />
        <div className={`${styles.titleWrapper} ${styles.likeLanguages}`}>
          <h3>관심 기술 태그</h3>
          <LikeLanguages
            placeholder={"관심 태그 선택"}
            likeLanguages={likeLanguages}
            setLikeLanguages={setLikeLanguages}
          ></LikeLanguages>
        </div>
        <p className={styles.description}>
          관심 있는 기술 태그를 등록해주세요.
        </p>
        <hr />
        <button
          onClick={onCompleteClick}
          className={`${styles.buttonComplete} ${styles.mainButton}`}
          name="complete"
        >
          완료
        </button>
        <button
          onClick={openModal}
          className={`${styles.buttonSignOut} ${styles.mainButton}`}
          name="signOut"
        >
          회원탈퇴
        </button>

        <Modal visible={showPopup} onClose={closeModal}>
          <CancelButton
            confirmMsg="Hola에서 계정을 삭제하시겠어요?"
            positiveMsg="네, 삭제할래요"
            negativeMsg="아니요"
            onPublish={onSignOutClick}
            onCancel={closeModal}
          ></CancelButton>
        </Modal>
      </div>
    </>
  );
};

export default Setting;
