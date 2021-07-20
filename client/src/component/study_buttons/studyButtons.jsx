import React, { useState } from "react";
import { setPost } from "../../store/write";
import styles from "./studyButtons.module.css";
import Modal from "../modal/modal_component/modal";
import CancelButton from "../../component/cancelButton/cancelButton";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const StudyButtons = ({ post }) => {
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleEdit = (dispatch, history, post) => {
    dispatch(setPost(post));
    history.push("/register");
  };

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
        <button onClick={() => handleEdit(dispatch, history, post)}>
          수정
        </button>
        <button onClick={openModal}>삭제</button>
      </section>

      <Modal visible={showPopup} onClose={closeModal}>
        <CancelButton
          confirmMsg="작성하신 글을 삭제 하시겠어요?"
          positiveMsg="네, 삭제할래요"
          negativeMsg="아니요"
        ></CancelButton>
      </Modal>
    </>
  );
};

export default StudyButtons;
