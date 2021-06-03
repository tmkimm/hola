import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import studyService from "../../../service/study_service";
import styles from "./postModal.module.css";
import { readPost, clearPost } from "../../../store/read";
import { setPost } from "../../../store/write";
import CommentContainer from "../../comment_container/commentContainer";
import { useHistory } from "react-router";

/* 

PostModal Component
Study Click시 해당 내용을 보여주는 Component입니다.
Study 내용을 받아와서 useEffect를 통해 API 호출 후 rendering 합니다.

To-Do
1. 로딩 바 구현
2. min-height 어떻게 처리할지 구현

*/

const handleEdit = (dispatch, history, post) => {
  dispatch(setPost(post));
  history.push("/register");
};

const handleDelete = () => {
  console.log("test delete");
};

const TestButton = ({ dispatch, history, post }) => {
  return (
    <section className={styles.buttonWrapper}>
      <button onClick={() => handleEdit(dispatch, history, post)}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </section>
  );
};

const PostModal = ({ study, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const read = useSelector((state) => state.read);
  console.log("postmodal rendering!!!");
  const defaultPath =
    "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/";
  console.log("###nickname : ", user.nickName);
  useEffect(() => {
    dispatch(readPost(study._id));
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, study._id]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.modalHeader}>
        <img
          className={styles.logo}
          src="/images/logo/hola_logo_y.png"
          alt="welcome"
        ></img>
        <div className={styles.exitWrapper} onClick={handleClose}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            tabIndex="1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
      </section>
      <section className={styles.modalContent}>
        <div className={styles.postHeader}>
          <div className={styles.registeredDate}>2021.05.24</div>
          <div className={styles.title}>{study.title}</div>
          <div className={styles.user}>
            <img
              className={styles.userImg}
              src={defaultPath + read.post.imagePath}
              alt="userImg"
            />
            <div className={styles.userName}>{read.post.nickname}</div>
          </div>
          {user.nickName === read.post.nickname && (
            <TestButton
              dispatch={dispatch}
              history={history}
              post={read.post}
            ></TestButton>
          )}
        </div>
        <div className={styles.postContentWrapper}>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: read.post.content }}
          ></div>
        </div>
      </section>
      <section className={styles.modalComment}>
        <div className={styles.postComment}>
          <CommentContainer id={study._id}></CommentContainer>
        </div>
      </section>
    </div>
  );
};
//user={{...user}}

export default PostModal;
