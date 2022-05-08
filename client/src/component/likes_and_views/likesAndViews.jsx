import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import studyService from 'service/study_service';
import { setModalVisible } from 'store/loginStep';
import LoginModal from 'component/modal/login_modal/loginModal';
import Modal from 'component/modal/modal_component/modal';
import styles from './likesAndViews.module.css';

/* 

좋아요수와 조회수를 보여주는 component입니다.

*/

const LikesAndViews = ({ views, studyId, userId }) => {
  const [likeImg, setLikeImg] = useState('heart_unfilled');
  const [totalLikes, setTotalLikes] = useState(0);
  useEffect(() => {
    studyService.getLikesUser(studyId).then((res) => {
      setTotalLikes(res.likeUsers.length);
      if (userId === undefined) {
        setLikeImg('heart_unfilled');
      } else {
        const isLike = res.likeUsers.filter((likeUserid) => likeUserid === userId);
        isLike.length === 0 ? setLikeImg('heart_unfilled') : setLikeImg('heart_filled');
      }
    });
  }, [studyId, userId]);

  const modalVisible = useSelector((state) => state.loginStep.modalVisible);

  const dispatch = useDispatch();

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    dispatch(setModalVisible(true));
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    dispatch(setModalVisible(false));
  };

  const handleLikesClick = async () => {
    if (userId === undefined) {
      openModal();
      return;
    }

    if (likeImg === 'heart_filled') {
      const response = await studyService.deleteLikes(studyId);
      setLikeImg('heart_unfilled');
      setTotalLikes(response.data.likeUsers.length);
    } else {
      const response = await studyService.addLikes(studyId);
      setTotalLikes(response.data.likeUsers.length);
      setLikeImg('heart_filled');
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
            alt='likes'
          />
          <p>{totalLikes}</p>
        </div>
        <div className={styles.views}>
          <img className={styles.eyeImg} src='/images/info/eye.png' alt='views' />
          <p>{views}</p>
        </div>
      </section>
      <Modal visible={modalVisible} name='login' onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </>
  );
};

export default LikesAndViews;
