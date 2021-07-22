import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../component/nav_bar/navbar";
import StudyList from "../../component/study_list/studyList";
import studyService from "../../service/study_service";
import userService from "../../service/user_service";
import styles from "./myLikes.module.css";

const MyLikes = (props) => {
  const [readList, setReadList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const userId = useSelector((state) => state.user.id);
  console.log("user from myLikse : ", userId);

  useEffect(() => {
    // userService.getUserLikeList(userId).then((res) => {
    //   console.log(res);
    //   setLikeList((state) => res.data);
    // });

    userService.getUserReadList(userId).then((res) => {
      console.log(res);
      setReadList((state) => res.data.readList);
    });
  }, []);
  //   <StudyList studyList={readList}></StudyList>
  console.log(readList);
  return (
    <>
      <Navbar showRegisterButton={true}></Navbar>
      <section className={styles.pageWrapper}>
        <div className={styles.test}>읽은 목록</div>
        <StudyList studyList={readList}></StudyList>
      </section>
    </>
  );
};

export default MyLikes;
