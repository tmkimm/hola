import React, { useEffect } from 'react';
import styles from './postRegister.module.css';
import EditorContainer from 'component/editor/editorContainer';
import WritebuttonContainer from 'component/write_button/writebuttonContainer';
import Navbar from 'component/nav_bar/navbar';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { PostInfo } from 'component/postInfo';

const PostRegister = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user.id === undefined) {
      toast.error('로그인이 필요한 페이지입니다.', {
        position: 'top-right',
        autoClose: 3000,
      });
      history.push('/');
    }
  }, [history, user.id, user.nickName]);

  return (
    <>
      <Navbar />
      <div className={styles.postWrapper}>
        <section className={styles.postInfo}>
          <div className={styles.postContentWrapper}>
            <span className={styles.sequence}>1</span>
            <div className={styles.titleWrapper}>
              <h2 className={styles.text}>프로젝트 기본 정보를 입력해주세요.</h2>
              <a
                href='https://patch-failing-503.notion.site/Udemy-X-Hola-df31594fa0934d56bf9f1978a74398e2'
                target='_blank'
                rel='noreferrer'
              >
                <span className={styles.udemy}>유데미 무료 강의 목록 확인하기</span>
              </a>
            </div>
          </div>
          <PostInfo />
        </section>
        <section className={styles.postContent}>
          <div className={styles.postContentWrapper}>
            <span className={styles.sequence}>2</span>
            <h2 className={styles.text}>프로젝트에 대해 소개해주세요.</h2>
          </div>
          <EditorContainer></EditorContainer>
          <WritebuttonContainer></WritebuttonContainer>
        </section>
      </div>
    </>
  );
};
export default PostRegister;
