import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../component/nav_bar/navbar";
import StudyList from "../../component/study_list/studyList";
import userService from "../../service/user_service";
import styles from "./myLikes.module.css";

/*

User가 최근 읽은 글 및 좋아요 한 글을 볼 수 있는 page입니다.
component rendering시 useEffect를 통해 render할 post list를 받아옵니다.

*/

const SHOW_BY_LIKES = "likes";
const SHOW_BY_READS = "reads";
const ACTIVE = styles.active;
const INACTIVE = styles.inactive;

const MyLikes = (props) => {
  const [readList, setReadList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [category, setCategory] = useState(SHOW_BY_LIKES);
  const userId = useSelector((state) => state.user.id);
  console.log("user from myLikse : ", userId);

  const toggleCategory = () => {
    if (category === SHOW_BY_READS) setCategory((state) => SHOW_BY_LIKES);
    else setCategory((state) => SHOW_BY_READS);
  };

  useEffect(() => {
    userService.getUserLikeList(userId).then((res) => {
      setLikeList((state) => res.data.likeStudies);
    });

    userService.getUserReadList(userId).then((res) => {
      setReadList((state) => res.data.readList);
    });
  }, [userId]);

  return (
    <>
      <Navbar showRegisterButton={true}></Navbar>

      <section className={styles.pageWrapper}>
        <div className={styles.myLikes}>
          <main className={styles.main}>
            <section className={styles.category}>
              <div
                className={`${styles.category__item} ${
                  category === SHOW_BY_READS ? ACTIVE : INACTIVE
                }`}
                onClick={toggleCategory}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                </svg>
                <span className={styles.text}>읽은 목록</span>
              </div>

              <div
                className={`${styles.category__item} ${
                  category === SHOW_BY_READS ? INACTIVE : ACTIVE
                }`}
                onClick={toggleCategory}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                </svg>
                <span className={styles.text}>좋아요 목록</span>
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
