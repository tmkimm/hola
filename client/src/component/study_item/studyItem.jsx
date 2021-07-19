import React, { useState } from "react";
import styles from "./studyItem.module.css";
import Modal from "../modal/modal_component/modal";
import PostModal from "../modal/post_modal/postModal";
import { useHistory } from "react-router-dom";

const StudyItem = ({ study }) => {
  const studyLang = [];
  const history = useHistory();

  for (let i = 0; i < 3; i++) {
    if (study.language[i] === undefined) break;
    if (study.language[i] === "c#") studyLang.push("cc");
    else studyLang.push(study.language[i]);
  }

  const [modalVisible, setModalVisible] = useState(false);
  // const openModal = () => {
  //   document.body.style.overflow = "hidden";
  //   setModalVisible(true);
  // };
  const onClick = () => {
    history.push(`/study?id=${study._id}`);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setModalVisible(false);
  };

  return (
    <>
      <li className={styles.studyItem} onClick={onClick}>
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
            <img
              className={styles.itemImg}
              src="/images/info/heart_filled.png"
              alt="likes"
            />
            <p>{study.totalLikes}</p>
          </div>
          <div className={styles.infoItem}>
            <img
              className={styles.viewImg}
              src="/images/info/eye.png"
              alt="views"
            />
            <p>{study.views}</p>
          </div>
        </section>
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
