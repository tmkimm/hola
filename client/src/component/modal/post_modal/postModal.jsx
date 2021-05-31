import React, { useEffect, useState } from "react";
import studyService from "../../../service/study_service";
import styles from "./postModal.module.css";

/* 

PostModal Component
Study Click시 해당 내용을 보여주는 Component입니다.
Study 내용을 받아와서 useEffect를 통해 API 호출 후 rendering 합니다.

To-Do
1. 로딩 바 구현
2. min-height 어떻게 처리할지 구현

*/
const PostModal = ({ study, handleClose }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    studyService.getDetail(study._id).then((response) => {
      setContent((state) => response.data.content);
      console.log(response);
    });
  }, [study._id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalHeader}>
        <img
          className={styles.logo}
          src="images/logo/hola_logo_y.png"
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
      </div>
      <section className={styles.modalContent}>
        <div className={styles.postHeader}>
          <div className={styles.registeredDate}>2021.05.24</div>
          <div className={styles.title}>파이썬 스터디 구합니다</div>
          <div className={styles.user}>
            <img
              className={styles.userImg}
              src="https://media.vlpt.us/images/seeh_h/profile/6b7bfde5-b67c-4665-a2e1-a308e8de2059/tt.PNG?w=120"
              alt="thumbnail"
            />
            <div className={styles.userName}>velopert</div>
          </div>
        </div>
        <div className={styles.postContentWrapper}>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default PostModal;
