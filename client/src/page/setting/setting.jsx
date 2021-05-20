import React, { useState } from "react";
import { modifyUserInfo } from "../../store/user";
import Navbar from "../../component/nav_bar/navbar";
import styles from "./setting.module.css";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import languageList from '../../languageList';

const customStyles = {
  control: (css) => ({
    ...css,
    width: "500px",
  }),
};

const Setting = (props) => {
  const [nickName, setNickName] = useState('');
  const [likeLanguages, setLikeLanguages] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const onCompleteClick = async (e) => {
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
