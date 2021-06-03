import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./commentItem.module.css";
import studyService from "../../service/study_service";
import { formatDate } from "../../common/utils.js"

const CommentItem =  React.memo(({ comment, setIsComplete, isComplete }) => {
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState(comment.content);
  const [preContent, setPreContent] = useState(comment.content);
  const [inputVisible, setInputVisible] = useState(false);  // 댓글 입력 여부
  const defaultImage = 'https://media.vlpt.us/images/seeh_h/profile/6b7bfde5-b67c-4665-a2e1-a308e8de2059/tt.PNG?w=120';

  // 댓글 수정 버튼 클릭
  const onModifyClick = () => {
    setInputVisible(true);
  };

  // 댓글 삭제 버튼 클릭
  const onDeleteClick  = async () => {
    setInputVisible(false);
    await studyService.deleteComment({ id: comment._id });
    setIsComplete(isComplete => !isComplete);
  };

  // 댓글 수정 완료 버튼 클릭
  const onModifyCompleteClick = async () => {
    await studyService.modifyComment({ id: comment._id, content });
    setInputVisible(false);
  };

  // 댓글 취소 버튼 클릭
  const onCancelClick = () => {
    setContent(preContent);
    setInputVisible(false);
  };

  // 수정, 삭제 버튼 컨트롤
  const ButtonControl = () => {
    return (
      <section className={styles.buttonWrapper}>
        <button onClick={onModifyClick}>수정</button>
        <button onClick={onDeleteClick}>삭제</button>
      </section>
    );
  };

  return (
    <>
      <section className={styles.commentHeader}>
        <img
          className={styles.userImg}
          src={comment.author.image ? `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${comment.author.image}` : defaultImage}
          alt="사용자 이미지"/>
        <div className={styles.commentInfo}>
          <div className={styles.title}>
            <div className={styles.registeredDate}>{formatDate(comment.createdAt)}</div>
            <div>{comment.author.nickName}</div>
          </div>
        </div>
        {user.nickName == comment.author.nickName && <ButtonControl></ButtonControl>}
      </section>
      <section  className={styles.commentContent}>
      
      {inputVisible && 
        <React.Fragment>
          <div className={styles.commentInput}>
          <input type="text" name="contentInput" value={content} placeholder={comment.content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <div className={styles.commentInputButton}>
              <button onClick={onCancelClick} className={styles.buttonCancel} name="complete">취소</button>
              <button onClick={onModifyCompleteClick} className={styles.buttonComplete} name="cancel">완료</button>
            </div>
          </div>
        </React.Fragment>
      }
      {!inputVisible && <p>{content}</p>}
      
      </section>
      <hr />
    </>
  );
});

export default CommentItem;
