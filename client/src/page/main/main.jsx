import styles from "./main.module.css";
import { useEffect, useState } from "react";
import StudyList from "../../component/study_list/studyList";
import Navbar from "../../component/nav_bar/navbar";
import Banner from "../../component/banner/banner";
import React from "react";
import LanguageBarList from "../../component/language_bar_list/languageBarList";
import { useSelector } from "react-redux";
import studyService from "../../service/study_service";

const SORT_BY_VIEWS = "+views";
const SORT_BY_DATE = "-createdAt";

const Main = () => {
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
  }, [selectedLanguages]);

  return (
    <>
      <Navbar></Navbar>
      <Banner />
      <div className={styles.languageBarWrapper}>
        <LanguageBarList />
      </div>
      <div className={styles.appWrapper}>
        <div className={styles.app}>
          <main className={styles.main}>
            <h1 className={styles.title}>가장 인기있는 글이에요!</h1>
            <StudyList studyList={popularStudyList}></StudyList>
            <h1 className={styles.title}>지금 올라왔어요!</h1>
            <StudyList studyList={recentStudyList}></StudyList>
          </main>
        </div>
      </div>
    </>
  );
};
export default Main;
