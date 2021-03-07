import styles from "./main.module.css";
import { useEffect, useState } from "react";
import StudyList from "../../component/study_list/studyList";
import Navbar from "../../component/nav_bar/navbar";
import Login from "../../component/login/login";
import Banner from "../../component/banner/banner";
import React from "react";
import LanguageBarList from "../../component/language_bar_list/languageBarList";
import { useSelector } from "react-redux";

const SORT_BY_VIEWS = "+views";
const SORT_BY_DATE = "-createdAt";

const Main = ({ studyService }) => {
  const [popularStudyList, setPopularStudyList] = useState([]);
  const [recentStudyList, setRecentStudyList] = useState([]);
  const selectedLanguages = useSelector((state) => state.language);

  useEffect(() => {
    studyService //
      .getList(SORT_BY_DATE, selectedLanguages)
      .then((response) => {
        setRecentStudyList(response.data);
      })
      .catch(console.error);

    studyService //
      .getList(SORT_BY_VIEWS, selectedLanguages)
      .then((response) => {
        setPopularStudyList(response.data);
      })
      .catch(console.error);
  }, [studyService, selectedLanguages]);

  const onStudyClick = () => {
    console.log("clicked!");
  };

  return (
    <>
      <Navbar></Navbar>
      <Banner />
      <div className={styles.languageBarWrapper}>
        <LanguageBarList />
      </div>
      <div className={styles.app}>
        <main className={styles.main}>
          <h1 className={styles.title}>가장 인기있는 글이에요!</h1>
          <StudyList
            onStudyClick={onStudyClick}
            studyList={popularStudyList}
          ></StudyList>
          <h1 className={styles.title}>지금 올라왔어요!</h1>
          <StudyList
            onStudyClick={onStudyClick}
            studyList={recentStudyList}
          ></StudyList>
        </main>
      </div>
    </>
  );
};
export default Main;
