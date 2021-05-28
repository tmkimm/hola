import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';

import styles from "./setting.module.css";
import Navbar from "../../component/nav_bar/navbar";
import languageList from '../../languageList';
import userService from "../../service/user_service";
import studyService from "../../service/study_service";
import { clearUser } from "../../store/user";
import { nextStep } from "../../store/loginStep";
import { modifyUserInfo } from "../../store/user";
import { getFormatedToday } from "../../common/utils";
import LikeLanguages from "../../component/like_languages/likeLanguages";
import UserImageUpload from "../../component/user_image_upload/userImageUpload";
/*
// TODO
이미지 컴포넌트로 분리
s3 경로 config 파일로 분리

getPresignedUrl과 사용하는 filename 맞춰야함(분 달라지면 파일 못찾음)


*/
const Setting = (props) => {
  const [id, setID] = useState('');
  const [nickName, setNickName] = useState('');
  const [preNickName, setPreNickName] = useState('');
  const [likeLanguages, setLikeLanguages] = useState([]);
  const [image, setImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  // 사용자 정보 세팅
  useEffect(() => {
    if(user.nickName) {
      userService
      .getUserInfoByNickName(user.nickName)
      .then((response) => {
        const userInfo = response.data;
        if(userInfo.likeLanguages.length > 0) {
          setLikeLanguages(userInfo.likeLanguages.map((obj) => {
            let rObj = {};
            rObj.value = obj;
            rObj.label = languageList.find((element) => {
            if(element.value === obj)
              return true;
            }).label;
            return rObj;
          }));
        }
        setID(userInfo._id);
        setNickName(userInfo.nickName);
        setPreNickName(userInfo.nickName);
        if(userInfo.image) {
          setImage(userInfo.image);
        }
      })
      .catch(console.error);
    }
  },[]);

  // 변경 완료 버튼
  const onCompleteClick = async (e) => {
    if(!nickName) {
      toast.error('닉네임을 입력해야 합니다.', {
        position: "top-right",
        autoClose: 3000
      });
    }
    else {
      let languages = [];
      if(likeLanguages.length > 0) {
        likeLanguages.forEach(element => {
          languages.push(element.value);
        });
      }

      let payload = {
          id: id,
          likeLanguages: languages
      };

      if(nickName !== preNickName) {
        payload.nickName = nickName;
      }

      if(isImageChanged) {
        if(image) {
          const preSignedUrl = await studyService.getPresignedUrl(nickName);
          const fileName = `${nickName}_${getFormatedToday()}.png`;

          await studyService
          .uploadImageToS3WithBase64(preSignedUrl, image, fileName)
          .then((response) => {
            payload.image = fileName;
          });
        }
        else {
          payload.image = '';
        }
      }
      await dispatch(modifyUserInfo(payload)).then(
        (response) => {
          if(response.payload) {
            toast.success('변경이 완료되었습니다.', {
              position: "top-right",
              autoClose: 3000
            });
            history.push('/');
          }
          else {
            toast.error('닉네임이 중복되었습니다.', {
              position: "top-right",
              autoClose: 3000
            });
          }
        }
      );
    }
  };

  // 회원 탈퇴
  const onSignOutClick = async (e) => {
    userService.deleteUser(id).then((deleteSuccess) => {
      localStorage.removeItem("userName");
      dispatch(clearUser());
      dispatch(nextStep("LOGIN"));
      history.push('/');
    });
  };

    return (
    <>
        <Navbar></Navbar>
        <div className={styles.main}>
          <h1>내 정보 수정</h1>
          <UserImageUpload image={image} setImage={setImage} setIsImageChanged={setIsImageChanged}></UserImageUpload>
          <div className={styles.titleWrapper}>
              <h3>닉네임</h3>
              <input type="text" name="nickNameInput" value={nickName} onChange={(e) => {setNickName(e.target.value)}}/>
          </div>
          <p className={styles.description}>
              Hola에서 사용되는 이름입니다.
          </p>
          <hr />
          <div className={styles.titleWrapper}>
              <h3>
              관심 기술 태그
              </h3>
              <LikeLanguages likeLanguages={likeLanguages} setLikeLanguages={setLikeLanguages}></LikeLanguages>
          </div>
          <p className={styles.description}>
              관심 있는 기술 태그를 등록해주세요.
          </p>
          <hr />
          <button onClick={onCompleteClick} className={styles.buttonComplete} name="complete">완료</button>
          <button onClick={onSignOutClick} className={styles.buttonSignOut} name="signOut">회원탈퇴</button>
        </div>
    </>
    );
};

export default Setting;
