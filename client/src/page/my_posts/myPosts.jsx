import React, { useEffect, useState } from "react";
import Navbar from "../../component/nav_bar/navbar";
import styles from "./myPosts.module.css";
import { FaBook } from "react-icons/fa";
import StudyList from "../../component/study_list/studyList";
import userService from "../../service/user_service";
import { useSelector } from "react-redux";

const MyPosts = (props) => {
  const [postList, setPostList] = useState([]);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    userService.getUserPostList(userId).then((res) => {
      setPostList(res.data);
    });
  }, [userId]);

  return (
    <>
      <Navbar showRegisterButton={true}></Navbar>

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
