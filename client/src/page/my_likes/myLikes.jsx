import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'component/nav_bar/navbar';
import StudyList from 'component/study_list/studyList';
import userService from 'service/user_service';
import styles from './myLikes.module.css';
import { MdFavorite } from 'react-icons/md';
import { FaBook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

/*

User가 최근 읽은 글 및 좋아요 한 글을 볼 수 있는 page입니다.
component rendering시 useEffect를 통해 render할 post list를 받아옵니다.

*/

const SHOW_BY_LIKES = 'likes';
const SHOW_BY_READS = 'reads';
const ACTIVE = styles.active;
const INACTIVE = styles.inactive;

const MyLikes = (props) => {
  const [readList, setReadList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [category, setCategory] = useState(SHOW_BY_READS);
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return;
    if (category === SHOW_BY_READS) setCategory((state) => SHOW_BY_LIKES);
    else setCategory((state) => SHOW_BY_READS);
  };

  useEffect(() => {
    if (userId === undefined) {
      toast.error('로그인이 필요한 페이지입니다.', {
        position: 'top-right',
        autoClose: 3000,
      });
      history.push('/');
    }
    userService.getUserLikeList(userId).then((res) => {
      setLikeList((state) => res.data.posts);
    });

    userService.getUserReadList(userId).then((res) => {
      setReadList((state) => res.data);
    });
  }, [userId, history]);

  return (
    <>
      <Navbar />

      <section className={styles.pageWrapper}>
        <div className={styles.myLikes}>
          <main className={styles.main}>
            <section className={styles.category}>
              <div
                className={`${styles.category__item} ${
                  category === SHOW_BY_READS ? ACTIVE : INACTIVE
                }`}
                onClick={() => toggleCategory(SHOW_BY_READS)}
              >
                <FaBook />
                <span className={styles.text}>읽은 목록</span>
              </div>

              <div
                className={`${styles.category__item} ${
                  category === SHOW_BY_READS ? INACTIVE : ACTIVE
                }`}
                onClick={() => toggleCategory(SHOW_BY_LIKES)}
              >
                <MdFavorite />
                <span className={styles.text}>관심 목록</span>
              </div>
            </section>
            {category === SHOW_BY_LIKES ? (
              <StudyList studyList={likeList}></StudyList>
            ) : (
              <StudyList studyList={readList}></StudyList>
            )}
          </main>
        </div>
      </section>
    </>
  );
};

export default MyLikes;
