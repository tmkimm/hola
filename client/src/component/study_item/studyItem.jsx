import React from "react";
import styles from "./studyItem.module.css";
import { useHistory } from "react-router-dom";
import { FaRegCommentDots, FaRegEye } from "react-icons/fa";
import Avatar from "component/common/avatar/avatar";

const StudyItem = ({ study, lastStudyElementRef }) => {
  const studyLang = [];
  const history = useHistory();
  const displayType = study.isClosed ? styles.closed : styles.open;

  for (let i = 0; i < 3; i++) {
    if (study.language[i] === undefined) break;
    if (study.language[i] === "c#") studyLang.push("cc");
    else studyLang.push(study.language[i]);
  }

  const onClick = () => {
    history.push(`/study/${study._id}`);
  };

  return (
    <li
      ref={lastStudyElementRef ? lastStudyElementRef : null}
      className={`${styles.studyItem} ${displayType}`}
      onClick={onClick}
    >
      <div className={styles.schedule}>
        <p className={styles.scheduleTitle}>일정 |</p>
        <p className={styles.scheduleInfo}>2020.02.05-03.14</p>
      </div>
      <h1 className={styles.title}>{study.title}</h1>
      <p className={styles.hashtag}>#웹토이 프로젝트 #개발자 #기획자</p>
      <ul className={styles.content}>
        {studyLang.map((lang, i) => (
          <li key={i} className={styles.language}>
            <img
              className={styles.languageImage}
              src={`/images/languages/${lang}.svg`}
              alt="language"
            />
          </li>
        ))}
      </ul>
      <section className={styles.info}>
        <Avatar size="small" userName="testUser"></Avatar>
        <div className={styles.viewsAndComment}>
          <div className={styles.infoItem}>
            <FaRegEye size={24} color={"#9A9A9A"} />
            <p className={styles.views}>{study.views}</p>
          </div>
          <div className={styles.infoItem}>
            <FaRegCommentDots size={20} color={"#9A9A9A"} />
            <p className={styles.comments}>{study.totalComments}</p>
          </div>
        </div>
      </section>
      {study.isClosed && <div className={styles.closeNotice}>모집 완료</div>}
    </li>
  );
};

export default StudyItem;
