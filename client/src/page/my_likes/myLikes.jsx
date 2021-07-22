import React, { useEffect, useState } from "react";
import Navbar from "../../component/nav_bar/navbar";
import studyService from "../../service/study_service";
import userService from "../../service/user_service";
import styles from "./myLikes.module.css";

const MyLikes = (props) => {
  const [readList, setReadList] = useState([]);
  const [likeList, setLikeList] = useState([]);

  // useEffect(() => {
  //   userService.getUserLikeList().then((res) => {
  //     setLikeList((state) => res.data);
  //   });

  //   userService.getUserReadList().then((res) => {
  //     setReadList((state) => res.data);
  //   });
  // }, []);

  console.log(readList, likeList);
  return (
    <>
      <Navbar showRegisterButton={true}></Navbar>
      <section className={styles.pageWrapper}>
        <div className={styles.test}>hi I'm my post page</div>
      </section>
    </>
  );
};

export default MyLikes;
