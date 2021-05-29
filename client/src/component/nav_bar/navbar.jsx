import React, { useEffect, useState } from "react";
import LoginModal from "../modal/login_modal/loginModal";
import Modal from "../modal/modal_component/modal";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginUser from "../login_user/loginUser";
import { setModalVisible } from "../../store/loginStep";
import { clearUser, fetchUserByRefreshToken, setUser } from "../../store/user";

const Navbar = React.memo(() => {
  console.log("NAVBAR START!");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const modalVisible = useSelector((state) => state.loginStep.modalVisible);
  const openModal = () => {
    document.body.style.overflow = "hidden";
    dispatch(setModalVisible(true));
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    dispatch(setModalVisible(false));
  };

  useEffect(() => {
    if (user.nickName) {
      // page refresh후 갱신
      dispatch(fetchUserByRefreshToken()).then((response) => {
        // 유저 nickname 존재시 refresh token을 이용해서 유저정보 얻어옴
        if (response.meta.requestStatus !== "fulfilled") history.push("/");
        console.log("fetchByuserRefreshToken response :", response);
        // 실패했을때 에러처리 필요할 듯
      });
    }
  }, [dispatch, history, user.nickName]);

  return (
    <nav className={styles.navbar}>
      <a href="/">
        <img
          className={styles.logo}
          src="/images/logo/hola_logo_w.png"
          alt="logo"
        />
      </a>
      <div className={styles.loginElementWrapper}>
        {!user.nickName ? (
          <button className={styles.login} onClick={openModal}>
            로그인
          </button>
        ) : (
          <>
            <button className={styles.postRegister}>
              <Link to="/register">새 글 쓰기</Link>
            </button>
            <LoginUser />
          </>
        )}
      </div>
      {modalVisible && (
        <Modal visible={modalVisible} onClose={closeModal}>
          <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
        </Modal>
      )}
    </nav>
  );
});

export default Navbar;
