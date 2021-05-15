import React from "react";
import LoginModal from "../modal/login_modal/loginModal";
import Modal from "../modal/modal_component/modal";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginUser from "../login_user/loginUser";
import { setModalVisible } from "../../store/loginStep";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const modalVisible = useSelector((state) => state.loginStep.modalVisible);
  const openModal = () => {
    document.body.style.overflow = "hidden";
    dispatch(setModalVisible(true));
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    dispatch(setModalVisible(false));
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
