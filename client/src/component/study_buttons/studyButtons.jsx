import React, { useState } from "react";
import styles from "./studyButtons.module.css";
import Modal from "../modal/modal_component/modal";
import CancelButton from "../../component/cancelButton/cancelButton";

const StudyButtons = ({
  history,
  dispatch,
  handleEdit,
  handleDelete,
  isClosed,
  handleEnd,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShowPopup((state) => !state);
  };

  const openEditModal = () => {
    document.body.style.overflow = "hidden";
    setShowEditPopup((state) => !state);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowPopup((state) => !state);
  };

  const closeEditModal = () => {
    document.body.style.overflow = "auto";
    setShowEditPopup((state) => !state);
  };

  const handleStudy = () => {
    handleEnd();
    closeEditModal();
  };
  return (
    <>
      <section className={styles.buttonWrapper}>
        <button onClick={openEditModal}>
          {isClosed === true ? "마감 취소" : "마감"}
        </button>
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

      <Modal visible={showEditPopup} onClose={closeEditModal}>
        <CancelButton
          confirmMsg={
            isClosed === true
              ? "마감을 취소하시겠어요?"
              : "마감 처리 하시겠어요?"
          }
          positiveMsg={isClosed === true ? "네, 취소할게요" : "네, 마감할게요"}
          negativeMsg="아니요"
          onCancel={closeEditModal}
          onPublish={handleStudy}
        ></CancelButton>
      </Modal>
    </>
  );
};

export default StudyButtons;
