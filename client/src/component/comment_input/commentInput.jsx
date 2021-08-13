import React from "react";
import styles from "./commentInput.module.css";

const CommentInput = ({ content, setContent, onRegisterClick, count }) => {
  return (
    <div className={styles.commentInput}>
      <h1 className={styles.commentCount}>{count}개의 댓글이 있습니다.</h1>
      <textarea
        placeholder="댓글을 입력하세요."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className={styles.buttonWrapper}>
        <button
          onClick={onRegisterClick}
          className={styles.buttonComplete}
          name="register"
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
