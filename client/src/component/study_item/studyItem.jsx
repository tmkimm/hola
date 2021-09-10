import React, { useState } from "react";
import styles from "./studyItem.module.css";
import Modal from "component/modal/modal_component/modal";
import PostModal from "component/modal/post_modal/postModal";
import { useHistory } from "react-router-dom";
import { FaRegCommentDots, FaRegEye } from "react-icons/fa";

const StudyItem = ({ study, lastStudyElementRef }) => {
  const studyLang = [];
  const history = useHistory();
  const displayType = study.isClosed ? styles.closed : styles.open;

  for (let i = 0; i < 3; i++) {
    if (study.language[i] === undefined) break;
    if (study.language[i] === "c#") studyLang.push("cc");
    else studyLang.push(study.language[i]);
  }

  const [modalVisible, setModalVisible] = useState(false);

  const onClick = () => {
    history.push(`/study/${study._id}`);
    // console.log(study);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setModalVisible(false);
  };

  return (
    <>
      <li
        ref={lastStudyElementRef ? lastStudyElementRef : null}
        className={`${styles.studyItem} ${displayType}`}
        onClick={onClick}
      >
        <h1 className={styles.title}>{study.title}</h1>
        <ul className={styles.content}>
          {studyLang.map((lang, i) => (
            <li key={i} className={styles.language}>
              <img
                className={styles.languageImage}
                src={`/images/languages/${lang}.png`}
                alt="language"
              />
              <p className={styles.languageName}>
                {lang === "cc" ? "c#" : lang}
              </p>
            </li>
          ))}
        </ul>
        <section className={styles.info}>
          <div className={styles.infoItem}>
            <FaRegCommentDots size={14} color={"#9A9A9A"} />
            <p className={styles.comments}>{study.totalComments}</p>
          </div>

          <div className={styles.infoItem}>
            <FaRegEye size={16} color={"#9A9A9A"} />
            <p className={styles.views}>{study.views}</p>
          </div>

          <div className={styles.infoItem}>
            <img
              className={styles.itemImg}
              src="/images/info/heart_filled.png"
              alt="likes"
            />
            <p>{study.totalLikes}</p>
          </div>
        </section>
        {study.isClosed && <div className={styles.closeNotice}>모집 완료</div>}
      </li>
      {modalVisible && (
        <Modal visible={modalVisible} onClose={closeModal}>
          <PostModal
            study={study}
            handleClose={closeModal}
            tabIndex={0}
          ></PostModal>
        </Modal>
      )}
    </>
  );
};

export default StudyItem;
