import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import CancelButton from "../../component/cancelButton/cancelButton";
import CommentContainer from "../../component/comment_container/commentContainer";
import LikesAndViews from "../../component/likes_and_views/likesAndViews";
import LoadingSpinner from "../../component/loading/loadingSpinner";
import Modal from "../../component/modal/modal_component/modal";
import Navbar from "../../component/nav_bar/navbar";
import { clearPost, readPost } from "../../store/read";
import { setPost } from "../../store/write";
import styles from "./study.module.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const handleEdit = (dispatch, history, post) => {
  dispatch(setPost(post));
  history.push("/register");
};

const TestButton = ({ dispatch, history, post }) => {
  const handleDelete = () => {
    setShowPopup((state) => !state);
  };
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <section className={styles.buttonWrapper}>
        <button onClick={() => handleEdit(dispatch, history, post)}>
          수정
        </button>
        <button onClick={handleDelete}>삭제</button>
      </section>
      {showPopup && <CancelButton></CancelButton>}
    </>
  );
};

const Study = () => {
  const query = useQuery();
  const studyId = query.get("id");
  const dispatch = useDispatch();
  const history = useHistory();
  const read = useSelector((state) => state.read);
  const user = useSelector((state) => state.user);
  const defaultPath =
    "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/";
  console.log(read);
  useEffect(() => {
    dispatch(readPost(studyId));
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, studyId]);

  return (
    <>
      <Navbar showRegisterButton={true}></Navbar>
      {read.loading === "idle" ? (
        <Modal visible={true} name="loading">
          <LoadingSpinner></LoadingSpinner>
        </Modal>
      ) : (
        <div className={styles.wrapper}>
          <section className={styles.postHeader}>
            <div className={styles.title}>{read.post.title}</div>
            <div className={styles.registeredDate}>
              {new Date(read.post.createdAt).toString()}
            </div>
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
          </section>
          <div className={styles.postContentWrapper}>
            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: read.post.content }}
            ></div>
          </div>

          <section className={styles.modalComment}>
            <LikesAndViews
              views={read.post.views}
              likeUser={read.post.likes}
              likes={read.post.likesCount}
              studyId={read.post.id}
              userId={user.id}
            ></LikesAndViews>
            <div className={styles.postComment}>
              <CommentContainer id={read.post.id}></CommentContainer>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Study;
