import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CommentContainer from "../../component/comment_container/commentContainer";
import LikesAndViews from "../../component/likes_and_views/likesAndViews";
import studyService from "../../service/study_service";
import { setPost } from "../../store/write";
import StudyButtons from "../study_buttons/studyButtons";
import styles from "./studyContent.module.css";

const StudyLanguage = ({ languages }) => {
  const usedLanguage = languages.map((lang) => lang.value);
  return (
    <ul className={styles.languageList}>
      {usedLanguage.map((lang, i) => (
        <LangItem Language={lang} key={i}></LangItem>
      ))}
    </ul>
  );
};

const LangItem = ({ Language }) => {
  const lang = Language === "c#" ? "cc" : Language;
  return (
    <li className={styles.languageItem}>
      <img
        className={styles.logo}
        src={`/images/languages/${lang}.png`}
        alt="language logo"
      />
    </li>
  );
};

const StudyContent = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const read = useSelector((state) => state.read);
  console.log(id);
  console.log("read : ", read);
  const handleDelete = async (id) => {
    await studyService.deleteStudy(id);
    document.body.style.overflow = "auto";
    history.push("/");
  };

  const handleEdit = (dispatch, history) => {
    dispatch(setPost(read.post));
    history.push("/register");
  };

  const defaultPath =
    "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/";

  return (
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
          <StudyButtons
            history={history}
            dispatch={dispatch}
            handleEdit={handleEdit}
            handleDelete={() => handleDelete(id)}
          ></StudyButtons>
        )}
        <h1 className={styles.languageInfo}>사용 언어 정보</h1>
        <StudyLanguage languages={read.post.language}></StudyLanguage>
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
          totalLikes={read.post.totalLikes}
          studyId={read.post.id}
          userId={user.id}
        ></LikesAndViews>
        <div className={styles.postComment}>
          <CommentContainer id={read.post.id}></CommentContainer>
        </div>
      </section>
    </div>
  );
};

export default StudyContent;
