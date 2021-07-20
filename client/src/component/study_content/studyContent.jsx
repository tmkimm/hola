import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CancelButton from "../../component/cancelButton/cancelButton";
import CommentContainer from "../../component/comment_container/commentContainer";
import LikesAndViews from "../../component/likes_and_views/likesAndViews";
import { setPost } from "../../store/write";
import Modal from "../modal/modal_component/modal";
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
  console.log(Language);
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

const StudyContent = () => {
  const user = useSelector((state) => state.user);
  const read = useSelector((state) => state.read);
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
          <StudyButtons post={read.post}></StudyButtons>
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
          likes={read.post.likesCount}
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
