import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import studyService from "../../service/study_service";
import { setModalVisible } from "../../store/loginStep";
import LoginModal from "../modal/login_modal/loginModal";
import Modal from "../modal/modal_component/modal";
import styles from "./likesAndViews.module.css";

/* 

좋아요수와 조회수를 보여주는 component입니다.

To-do
해당 글 id 던지면 좋아요 수와 views만 return 받을 수 있는 api 있으면 좋을 것 같음

삭제 제대로 되고 있는지 확인 필요
StudyContent에서 read, user redux 정보를 다 전달 받고 있는데, 
이거 제대로 된 구조인지 생각필요

*/

const LikesAndViews = ({ views, studyId, userId }) => {
  const [likeImg, setLikeImg] = useState("heart_unfilled");
  const [totalLikes, setTotalLikes] = useState(0);
  useEffect(() => {
    studyService.getLikesUser(studyId).then((res) => {
      setTotalLikes(res.likeUsers.length);
      if (userId === undefined) {
        setLikeImg("heart_unfilled");
      } else {
        const isLike = res.likeUsers.filter(
          (likeUserid) => likeUserid === userId
        );
        isLike.length === 0
          ? setLikeImg("heart_unfilled")
          : setLikeImg("heart_filled");
      }
    });
  }, [studyId, userId]);

  const modalVisible = useSelector((state) => state.loginStep.modalVisible);

  const dispatch = useDispatch();

  const openModal = () => {
    document.body.style.overflow = "hidden";
    dispatch(setModalVisible(true));
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    dispatch(setModalVisible(false));
  };

  const handleLikesClick = async () => {
    if (userId === undefined) {
      openModal();
      return;
    }

    if (likeImg === "heart_filled") {
      const response = await studyService.deleteLikes(studyId);
      setLikeImg("heart_unfilled");
      setTotalLikes(response.data.likeUsers.length);
    } else {
      const response = await studyService.addLikes(studyId);
      setTotalLikes(response.data.likeUsers.length);
      setLikeImg("heart_filled");
    }
  };

  return (
    <>
      <section className={styles.likesAndViewsWrapper}>
        <div className={styles.likes}>
          <img
            onClick={handleLikesClick}
            className={styles.itemImg}
            src={`/images/info/${likeImg}.png`}
            alt="likes"
          />
          <p>{totalLikes}</p>
        </div>
        <div className={styles.views}>
          <img
            className={styles.eyeImg}
            src="/images/info/eye.png"
            alt="views"
          />
          <p>{views}</p>
        </div>
      </section>
      <Modal visible={modalVisible} name="login" onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </>
  );
};

export default LikesAndViews;
