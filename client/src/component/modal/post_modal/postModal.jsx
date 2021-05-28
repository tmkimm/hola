import React from "react";
import styles from "./postModal.module.css";

const PostModal = ({ study, handleClose }) => {
  console.log("hihihihihihi Im modal");
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>스터디 합시다!</div>
    </div>
  );
};

export default PostModal;
