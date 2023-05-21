import React, { useEffect, useState } from 'react';
import CommentInput from 'component/comment_input/commentInput';
import CommentList from 'component/comment_list/commentList';
import studyService from 'service/study_service';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'component/modal/modal_component/modal';
import LoginModal from 'component/modal/login_modal/loginModal';
import { setModalVisible } from 'store/loginStep';

const CommentContainer = ({ id }) => {
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { id: userId, imageUrl } = useSelector((state) => state.user);
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

  // 댓글 등록 버튼
  const onRegisterClick = async (e) => {
    if (userId === undefined) {
      openModal();
      return;
    }
    await studyService.registerComment({ id, content });
    setContent('');
    setIsComplete((isComplete) => !isComplete);
  };

  useEffect(() => {
    studyService.getComments(id).then((response) => {
      setCommentList(response.data.comments);
    });
  }, [id, isComplete]);

  return (
    <div style={{ paddingBottom: '80px' }}>
      <CommentInput
        content={content}
        setContent={setContent}
        onRegisterClick={onRegisterClick}
        count={commentList.length}
        imageUrl={imageUrl}
      ></CommentInput>
      <CommentList
        CommentList={commentList}
        setIsComplete={setIsComplete}
        isComplete={isComplete}
      ></CommentList>
      <Modal visible={modalVisible} name='login' onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </div>
  );
};

export default CommentContainer;
