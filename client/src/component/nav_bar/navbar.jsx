import React, { useState } from "react";
import LoginModal from "../modal/login_modal/loginModal";
import Modal from "../modal/modal_component/modal";
import styles from "./navbar.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginUser from "../login_user/loginUser";

const Navbar = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.user);
  console.log(user);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setModalVisible(true);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setModalVisible(false);
  };

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
        <button className={styles.postList}>
          <Link to="/list">게시판</Link>
        </button>
        {user.nickName === undefined ? (
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
};

export default Navbar;
