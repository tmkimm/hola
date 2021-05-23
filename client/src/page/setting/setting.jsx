import React, { useEffect, useState } from "react";
import Select from 'react-select';
import Navbar from "../../component/nav_bar/navbar";
import styles from "./setting.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import languageList from '../../languageList';
import userService from "../../service/user_service";
import { clearUser } from "../../store/user";
import { nextStep } from "../../store/loginStep";
import { modifyUserInfo } from "../../store/user";
import { toast } from 'react-toastify';
/*
// TODO
메시지 처리
이미지 컴포넌트로 분리
s3 경로 config 파일로 분리


localstorage 체크
reject면 localstorage 삭제

*/
const customStyles = {
  control: (css) => ({
    ...css,
    width: "500px",
    height:"3rem"
  }),
};

const Setting = (props) => {
  const defaultImage = 'https://media.vlpt.us/images/seeh_h/profile/6b7bfde5-b67c-4665-a2e1-a308e8de2059/tt.PNG?w=120';
  const [id, setID] = useState('');
  const [nickName, setNickName] = useState('');
  const [likeLanguages, setLikeLanguages] = useState([]);
  const [userImage, setUserImage] = useState(defaultImage);
  const userNickName = useSelector((state) => state.user.nickName);
  const history = useHistory();
  const dispatch = useDispatch();

  // 사용자 정보 세팅
  useEffect(() => {
    if(userNickName) {
      userService
      .getUserInfoByNickName(userNickName)
      .then((response) => {
        const userInfo = response.data;
        setLikeLanguages(userInfo.likeLanguages.map((obj) => {
          var rObj = {};
          rObj[obj.value] = obj;
          return rObj;
        }));
        setID(userInfo._id);
        setNickName(userInfo.nickName);
        if(userInfo.image) {

        }
      })
      .catch(console.error);
    }
  },[]);

  // 변경 완료 버튼
  const onCompleteClick = async (e) => {
    // console.log(likeLanguages);
    // return false;
    if(!nickName) {
      toast.error('닉네임을 입력해야 합니다.', {
        position: "top-right",
        autoClose: 5000
      });
    }
    else {
      const languages = [];
      likeLanguages.forEach(element => {
        languages.push(element.value);
      });

      await dispatch(modifyUserInfo(
          {
              id: id,
              nickName,
              likeLanguages: languages
          })).then(
        () => {
          history.push('/');
        }
      );
    }
  };

  // 이미지 업로드 버튼
  const onImageUploadClick = async(e) => {

  }

  // 이미지 삭제 버튼
  const onImageRemoveClick = async(e) => {
    
  }
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
          <img
            className={styles.userImg}
            src={userImage}
            alt="사용자 이미지"
          />
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
              <Select
                isMulti
                styles={customStyles}
                name="likeLanguages"
                options={languageList}
                classNamePrefix="select"
                value={likeLanguages}
                onChange={(value) => {
                  setLikeLanguages(value);
                }}
              />
          </div>
          <p className={styles.description}>
              관심 있는 기술 태그를 등록해주세요.
          </p>
          <hr />
          <button onClick={onCompleteClick} className={styles.buttonComplete} name="complete">완료</button>
          <button onClick={onSignOutClick} className={styles.buttonSignOut} name="signOut">회원탈퇴</button>
          <button onClick={onImageUploadClick} className={styles.buttonComplete} name="uploadImage">이미지 업로드</button>
          <button onClick={onImageRemoveClick} className={styles.buttonComplete} name="removeImage">이미지 제거</button>
        </div>
    </>
    );
};

export default Setting;
