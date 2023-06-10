import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from 'store/loginStep';
import LoginModal from 'component/modal/login_modal/loginModal';
import Modal from 'component/modal/modal_component/modal';
import * as S from './styled';
import { HolaLogEvent } from 'common/GA';
import { useGetLikesUser } from 'hooks/useGetLikesUser';
import { useAddLikes } from 'hooks/useAddLikes';
import { useDeleteLikes } from 'hooks/useDeleteLikes';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const LikesAndViews = ({ views, studyId, userId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetLikesUser(studyId);
  const { mutateAsync: addLikes } = useAddLikes();
  const { mutateAsync: deleteLikes } = useDeleteLikes();
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
    HolaLogEvent('highfive_block', { category: studyId });
    if (userId === undefined) {
      openModal();
      return;
    }

    const isLike = data.likeUsers.find((likeId) => likeId === userId);
    const toastText = isLike ? '북마크를 해제했어요!' : '북마크를 추가했어요!';
    isLike ? await deleteLikes(studyId) : await addLikes(studyId);
    queryClient.invalidateQueries(['api', 'likes', 'user']);
    toast.success(toastText, {
      position: 'top-right',
      autoClose: 3000,
    });
  };
  if (isLoading) return <></>;
  return (
    <>
      <S.Container>
        <S.Views>
          <S.EyeImg src='/images/info/eye.png' alt='views' />
          <S.Text>{views}</S.Text>
        </S.Views>
        <S.Likes>
          <S.LikesImg
            onClick={handleLikesClick}
            src={
              data.likeUsers.find((likeId) => likeId === userId)
                ? '/images/info/bookmark_filled.svg'
                : '/images/info/bookmark.svg'
            }
            alt='likes'
          />
          <S.Text>{data.likeUsers.length}</S.Text>
        </S.Likes>
      </S.Container>
      <Modal visible={modalVisible} name='login' onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </>
  );
};

export default LikesAndViews;
