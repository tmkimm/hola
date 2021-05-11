import React, { useState } from "react";
import { modifyUserInfo } from "../../store/user";
import Navbar from "../../component/nav_bar/navbar";
import styles from "./setting.module.css";
import { useDispatch, useSelector } from "react-redux";

const Setting = (props) => {
  const [nickName, setNickName] = useState('');
  const [likeLanguages, setLikeLanguages] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const onNickNameChange = e => {
    setNickName(e.target.value);
  }
  const onCompleteClick = async (e) => {
    await dispatch(modifyUserInfo(
        {
            id: userId,
            nickName,
        })).then(
      () => {
        //handleClose();
      }
    );
  };

  const onSignOutClick = async (e) => {

  };

    return (
    <>
        <Navbar></Navbar>
        <div className={styles.main}>
            <h1>회원 정보 수정</h1>
            <div className={styles.titleWrapper}>
                <h3 className={styles.titleWrapperH3}>
                닉네임
                </h3>
                <input type="text" name="nickNameInput" onChange={onNickNameChange}/>
            </div>
            <p className={styles.description}>
                Hola에서 사용되는 이름입니다.
            </p>
            <hr />
            <div className={styles.titleWrapper}>
                <h3 className={styles.titleWrapperH3}>
                관심 기술 태그
                </h3>
                <input type="text" name="likeLanguages" />
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
