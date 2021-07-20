import React, { useState } from "react";
import styles from "./studyButtons.module.css";
import Modal from "../modal/modal_component/modal";
import CancelButton from "../../component/cancelButton/cancelButton";

const StudyButtons = ({ history, dispatch, handleEdit, handleDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShowPopup((state) => !state);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowPopup((state) => !state);
  };

  return (
    <>
      <section className={styles.buttonWrapper}>
        <button>마감</button>
        <button onClick={() => handleEdit(dispatch, history)}>수정</button>
        <button onClick={openModal}>삭제</button>
      </section>

      <Modal visible={showPopup} onClose={closeModal}>
        <CancelButton
          confirmMsg="작성하신 글을 삭제 하시겠어요?"
          positiveMsg="네, 삭제할래요"
          negativeMsg="아니요"
          onCancel={closeModal}
          onPublish={handleDelete}
        ></CancelButton>
      </Modal>
    </>
  );
};

export default StudyButtons;
