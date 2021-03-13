import React, { useState } from "react";
import Banner from "../banner/banner";
import LoginModal from "../modal/login_modal/loginModal";
import Modal from "../modal/modal_component/modal";
import StudyItem from "../study_item/studyItem";
import styles from "./navbar.module.css";

const Navbar = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <nav className={styles.navbar}>
      <img
        className={styles.logo}
        src="/images/logo/hola_logo_w.png"
        alt="logo"
      />
      <button className={styles.login} onClick={openModal}>
        로그인
      </button>
      {modalVisible && (
        <Modal visible={modalVisible} onClose={closeModal}>
          <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
