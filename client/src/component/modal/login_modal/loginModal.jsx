import React, { useState } from "react";
import Modal from "../modal_component/modal";

const LoginModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <button onClick={openModal}>Open asfafasfModal</button>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          moamdlkfjlsadfjlsdkfjlksfjl
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
