import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { modifyPost, writePost } from 'store/write';
import Writebutton from './writebutton';
import { toast } from 'react-toastify';

/* 

Writebutton을 감싸고 있는 component입니다.

post 등록이 성공하면 main page로 이동하고,
실패하면 error를 보여줍니다.

*/

const WritebuttonContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { title, content, language, post, postError, postId } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
    language: write.language,
    post: write.post,
    postError: write.postError,
    postId: write.postId,
  }));
  const checkValidity = () => {
    if (!title) {
      toast.error('제목을 입력해주세요!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (language.length === 0) {
      toast.error('사용 언어를 선택해주세요!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (!content) {
      toast.error('내용을 입력해주세요!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }
    return true;
  };
  // language 자동으로 넘어가도록 수정
  const onPublish = () => {
    if (!checkValidity()) return;

    if (postId) {
      dispatch(modifyPost({ postId, title, content, language })).then((response) => {
        toast.info('글 수정이 완료되었어요!', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
    } else {
      dispatch(writePost({ title, content, language })).then((response) => {
        toast.success('글 작성이 완료되었어요!', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
    }
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      history.push(`/`);
    }

    if (postError) {
      console.log(post.Error);
    }
  }, [history, post, postError]);

  return <Writebutton onPublish={onPublish} onCancel={onCancel}></Writebutton>;
};

export default WritebuttonContainer;
