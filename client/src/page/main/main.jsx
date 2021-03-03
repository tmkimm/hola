import styles from "./main.module.css";
import { useEffect, useState } from "react";
import StudyList from "../../component/study_list/studyList";
import Navbar from "../../component/nav_bar/navbar";
import Login from "../../component/login/login";
import Banner from "../../component/banner/banner";
import React from "react";
import LanguageBarList from "../../component/language_bar_list/languageBarList";
import { useDispatch, useSelector } from "react-redux";
import { addLanguage, removeLanguage } from "../../store/store";

const SORT_BY_VIEWS = "+views";
const SORT_BY_DATE = "-createdAt";

const Main = ({ studyService }) => {
  const [popularStudyList, setPopularStudyList] = useState([]);
  const [recentStudyList, setRecentStudyList] = useState([]);
  const selectedLanguages = useSelector((state) => state.language);

  useEffect(() => {
    console.log("useEffect 실행!!");
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
      <div className={styles.app}>
        <Banner></Banner>
        <LanguageBarList></LanguageBarList>
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
