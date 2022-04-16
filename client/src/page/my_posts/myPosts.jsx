import React, { useEffect, useState } from 'react';
import Navbar from 'component/nav_bar/navbar';
import styles from './myPosts.module.css';
import { FaBook } from 'react-icons/fa';
import StudyList from 'component/study_list/studyList';
import userService from 'service/user_service';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyPosts = (props) => {
  const [postList, setPostList] = useState([]);
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();

  useEffect(() => {
    if (userId === undefined) {
      toast.error('로그인이 필요한 페이지입니다.', {
        position: 'top-right',
        autoClose: 3000,
      });
      history.push('/');
    }

    userService.getUserPostList(userId).then((res) => {
      setPostList(res.data);
    });
  }, [userId, history]);

  return (
    <>
      <Navbar />

      <section className={styles.pageWrapper}>
        <div className={styles.myLikes}>
          <main className={styles.main}>
            <section className={styles.category}>
              <div className={styles.category__item}>
                <FaBook />
                <span className={styles.text}>작성 목록</span>
              </div>
            </section>
            <StudyList studyList={postList}></StudyList>
          </main>
        </div>
      </section>
    </>
  );
};

export default MyPosts;
