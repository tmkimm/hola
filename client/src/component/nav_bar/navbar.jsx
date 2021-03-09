import React, { useState } from "react";
import Modal from "../modal/modal_component/modal";
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
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          1안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요 6안녕하세요
          안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요 11안녕하세요 안녕하세요
          3안녕하세요 4안녕하세요 5안녕하세요 16안녕하세요 안녕하세요
          3안녕하세요 4안녕하세요 5안녕하세요 21안녕하세요 안녕하세요
          3안녕하세요 4안녕하세요 5안녕하세요 26안녕하세요 안녕하세요
          3안녕하세요 4안녕하세요 5안녕하세요
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
