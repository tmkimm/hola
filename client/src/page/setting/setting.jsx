import React from "react";
import Navbar from "../../component/nav_bar/navbar";
import styles from "./setting.module.css";

const Setting = (props) => {

  const onCompleteClick = async (e) => {
    //const nickName = e.target.nickName.value;
    //console.log("###########nickName:", nickName);
 
    // await dispatch(addUserNickName({ id: user.id, nickName })).then(
    //   (response) => {
    //     console.log("addUserNickName response :", response);
    //     handleClose();
    //   }
    // );
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
            </div>
            <input type="text" name="nickName" />
            <p className={styles.description}>
                Hola에서 사용되는 이름입니다.
            </p>
            <hr />
            <div className={styles.titleWrapper}>
                <h3 className={styles.titleWrapperH3}>
                관심 기술 태그
                </h3>
            </div>
            <input type="text" name="likeLanguages" />
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
