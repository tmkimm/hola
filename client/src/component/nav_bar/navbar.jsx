import React, { useState } from "react";
import LoginModal from "../modal/login_modal/loginModal";
import Modal from "../modal/modal_component/modal";
import styles from "./navbar.module.css";
import { useSelector } from "react-redux";

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
      {user.name === undefined ? (
        <button className={styles.login} onClick={openModal}>
          로그인
        </button>
      ) : (
        <div className={styles.user}>{user.userName}</div>
      )}
      {modalVisible && (
        <Modal visible={modalVisible} onClose={closeModal}>
          <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
