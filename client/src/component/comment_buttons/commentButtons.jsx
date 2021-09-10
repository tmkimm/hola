import React, { useState } from "react";
import CancelButton from "component/cancelButton/cancelButton";
import Modal from "component/modal/modal_component/modal";
import styles from "./commentButtons.module.css";

const CommentButtons = ({ onModifyClick, onDeleteClick }) => {
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
        <button onClick={onModifyClick}>수정</button>
        <button onClick={openModal}>삭제</button>
      </section>

      <Modal visible={showPopup} onClose={closeModal}>
        <CancelButton
          confirmMsg="댓글을 삭제 하시겠어요?"
          positiveMsg="네, 삭제할래요"
          negativeMsg="아니요"
          onPublish={onDeleteClick}
          onCancel={closeModal}
        ></CancelButton>
      </Modal>
    </>
  );
};

export default CommentButtons;
