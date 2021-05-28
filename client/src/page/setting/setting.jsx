import React, { useEffect, useState } from "react";
import Select from 'react-select';
import Navbar from "../../component/nav_bar/navbar";
import styles from "./setting.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import languageList from '../../languageList';
import userService from "../../service/user_service";
import studyService from "../../service/study_service";
import { clearUser } from "../../store/user";
import { nextStep } from "../../store/loginStep";
import { modifyUserInfo } from "../../store/user";
import { toast } from 'react-toastify';
import { getFormatedToday, getFileExtensions } from "../../common/utils";
/*
// TODO
메시지 처리
이미지 컴포넌트로 분리
s3 경로 config 파일로 분리

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
  const [preNickName, setPreNickName] = useState('');
  const [likeLanguages, setLikeLanguages] = useState([]);
  const [image, setImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
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
        if(userInfo.likeLanguages.length > 0) {
          setLikeLanguages(userInfo.likeLanguages.map((obj) => {
            let rObj = {
              value: '',
              label: 'test'
            };
            rObj.value = obj;
            rObj.label = languageList.find((element) => {
            if(element.value == obj)
              return true;
            }).label;
            return rObj;
          }));
        }
        setID(userInfo._id);
        setNickName(userInfo.nickName);
        setPreNickName(userInfo.nickName);
        if(userInfo.image) {
          setImage(`https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${userInfo.image}`);
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
        autoClose: 5000
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

      if(nickName != preNickName) {
        payload.nickName = nickName;
      }

      if(isImageChanged) {
        if(image) {
          const preSignedUrl = await studyService.getPresignedUrl(nickName);
          const fileName = `${nickName}_${getFormatedToday()}.png`;

          var arr = image.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
              
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          const imageFile = new File([u8arr], fileName, { type: mime });
          await studyService
          .uploadImageToS3(preSignedUrl, imageFile)
          .then((response) => {
            const imageUrl = `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${fileName}`;
            payload.image = fileName;
          });
        }
        else {
          payload.image = '';
        }
      }
      await dispatch(modifyUserInfo(payload)).then(
        (response) => {
          console.log(`payload : ` + response.payload);
          if(response.payload) {
            toast.success('변경이 완료되었습니다.', {
              position: "top-right",
              autoClose: 5000
            });
            history.push('/');
          }
          else {
            toast.error('닉네임이 중복되었습니다.', {
              position: "top-right",
              autoClose: 5000
            });
          }

        }
      );
    }
  };

  // 이미지 업로드 버튼
  const onImageUploadClick = async(e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    setIsImageChanged(true);
  }

  // 이미지 삭제 버튼
  const onImageRemoveClick = async(e) => {
    setImage('');
    setIsImageChanged(true);
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
          <div className={styles.image}>
            <img
              className={styles.userImg}
              src={image ? image : defaultImage}
              alt="사용자 이미지"/>
            <div className={styles.imageControl}>
              <label className={styles.customLabelFileUpload}>
                이미지 선택
                <input id="imageUpload" type="file" accept="image/*" onChange={onImageUploadClick}/>
              </label>
              <button onClick={onImageRemoveClick} className={styles.buttonImageDelete} name="removeImage">이미지 제거</button>
            </div>
          </div>
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
        </div>
    </>
    );
};

export default Setting;
