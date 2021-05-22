import React, { useState } from "react";
import Select from 'react-select';
import Navbar from "../../component/nav_bar/navbar";
import styles from "./setting.module.css";
import { modifyUserInfo } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import languageList from '../../languageList';
import { useHistory } from "react-router";
import { useToasts } from 'react-toast-notifications';
import userService from "../../service/user_service";
import { clearUser } from "../../store/user";
import { nextStep } from "../../store/loginStep";



const customStyles = {
  control: (css) => ({
    ...css,
    width: "500px",
    height:"3rem"
  }),
};

const Setting = (props) => {
  const [nickName, setNickName] = useState('');
  const [likeLanguages, setLikeLanguages] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.user.id);

  const onCompleteClick = async (e) => {
    if(nickName == '') {
      // addToast('닉네임을 입력해야 합니다.', {
      //   appearance: 'warning',
      //   autoDismiss: true,
      // })
    }
    else {
      const languages = [];
      likeLanguages.forEach(element => {
        languages.push(element.value);
      });

      await dispatch(modifyUserInfo(
          {
              id: userId,
              nickName,
              likeLanguages: languages
          })).then(
        () => {
          history.push('/');
        }
      );
    }
  };

  // 회원 탈퇴
  const onSignOutClick = async (e) => {
    userService.deleteUser(userId).then((deleteSuccess) => {
      console.log(`deleteSuccess : ${deleteSuccess}`)
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
            <h1>회원 정보 수정</h1>
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
                  vlaue={likeLanguages}
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
