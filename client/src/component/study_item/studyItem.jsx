import React, { useState } from "react";
import styles from "./studyItem.module.css";
import Modal from "../modal/modal_component/modal";
import PostModal from "../modal/post_modal/postModal";

const StudyItem = ({ study }) => {
  const studyLang = [];
  for (let i = 0; i < 3; i++) {
    if (study.language[i] === undefined) break;
    studyLang.push(study.language[i]);
  }

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    document.body.style.overflow = "hidden";
    setModalVisible(true);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setModalVisible(false);
  };

  return (
    <>
      <li className={styles.studyItem} onClick={openModal}>
        <h1 className={styles.title}>{study.title}</h1>
        <ul className={styles.content}>
          {studyLang.map((lang, i) => (
            <li key={i} className={styles.language}>
              <img
                className={styles.languageImage}
                src={`/images/languages/${lang}.png`}
                alt="language"
              />
              <p className={styles.languageName}>{lang}</p>
            </li>
          ))}
        </ul>
        <section className={styles.info}>
          <div className={styles.infoItem}>
            <img
              className={styles.itemImg}
              src="/images/info/location.png"
              alt="location"
            />
            <p>{study.location}</p>
          </div>
          <div className={styles.infoItem}>
            <img
              className={styles.itemImg}
              src="/images/info/heart_filled.png"
              alt="likes"
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
