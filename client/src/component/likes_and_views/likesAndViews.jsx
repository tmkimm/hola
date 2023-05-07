import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import studyService from 'service/study_service';
import { setModalVisible } from 'store/loginStep';
import LoginModal from 'component/modal/login_modal/loginModal';
import Modal from 'component/modal/modal_component/modal';
import * as S from './styled';

const LikesAndViews = ({ views, studyId, userId }) => {
  const [likeImg, setLikeImg] = useState('bookmark');
  const [totalLikes, setTotalLikes] = useState(0);
  useEffect(() => {
    studyService.getLikesUser(studyId).then((res) => {
      setTotalLikes(res.likeUsers.length);
      if (userId === undefined) {
        setLikeImg('bookmark');
      } else {
        const isLike = res.likeUsers.filter((likeUserid) => likeUserid === userId);
        isLike.length === 0 ? setLikeImg('bookmark') : setLikeImg('bookmark_filled');
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

    if (likeImg === 'bookmark') {
      const response = await studyService.deleteLikes(studyId);
      setLikeImg('bookmark');
      setTotalLikes(response.data.likeUsers.length);
    } else {
      const response = await studyService.addLikes(studyId);
      setTotalLikes(response.data.likeUsers.length);
      setLikeImg('bookmark_filled');
    }
  };

  return (
    <>
      <S.Container>
        <S.Views>
          <S.EyeImg src='/images/info/eye.png' alt='views' />
          <S.Text>{views}</S.Text>
        </S.Views>
        <S.Likes>
          <S.LikesImg onClick={handleLikesClick} src={`/images/info/${likeImg}.png`} alt='likes' />
          <S.Text>{totalLikes}</S.Text>
        </S.Likes>
      </S.Container>
      <Modal visible={modalVisible} name='login' onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </>
  );
};

export default LikesAndViews;
