import React, { useState } from "react";
import styles from "./studyItem.module.css";
import Modal from "../modal/modal_component/modal";

const StudyItem = ({ study, onStudyClick }) => {
  const studyLang = [];
  for (let i = 0; i < 3; i++) {
    if (study.language[i] === undefined) break;
    studyLang.push(study.language[i]);
  }

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    console.log("click!!!!!!!!!!!1");
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          1안녕하세요 2안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          6안녕하세요 7안녕하세요 8안녕하세요 9안녕하세요 10안녕하세요
          11안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요flskdjfs
          16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요flskdjfs
          16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요flskdjfs
          16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요flskdjfs
          16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요flskdjfs
          16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요flskdjfs
          16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요flskdjfs
          16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요 5안녕하세요
          26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요
          5안녕하세요flskdjfs16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요
          5안녕하세요 21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요
          5안녕하세요 26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요
          5안녕하세요flskdjfs16안녕하세요 안녕하세요 3안녕하세요 4안녕하세요
          5안녕하세요 21안녕하세요 안녕하세요 3안녕하세요 4안녕하세요
          5안녕하세요 26안녕하세요 안녕하세요 3안녕하세요 4안녕하세요
          5안녕하세요flskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkfmoamdlkfjlsadfjlsdkfjlksfjl
          sdjflskdjflskjflskdjfs dfsalkfjaslfjslkf
        </Modal>
      )}
      <li className={styles.studyItem} onClick={openModal}>
        <h1 className={styles.title}>{study.title}</h1>
        <ul className={styles.content}>
          {studyLang.map((lang) => (
            <li className={styles.language}>
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
              alt="location"
            />
            <p>{study.views}</p>
          </div>
        </section>
      </li>
    </>
  );
};

export default StudyItem;
