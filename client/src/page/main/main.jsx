import styles from "./main.module.css";
import { useEffect, useState } from "react";
import StudyList from "../../component/study_list/studyList";
import Navbar from "../../component/nav_bar/navbar";
import Banner from "../../component/banner/banner";
import React from "react";
import LanguageBarList from "../../component/language_bar_list/languageBarList";
import { useSelector } from "react-redux";
import studyService from "../../service/study_service";

/* 

main page의 layout을 담당하는 component입니다. 
component rendering시 useEffect를 통해 render할 post list를 받아옵니다.

최신, 트렌딩 두가지의 기준으로 분리하였습니다.

To-Do
category component 분리

*/

const SORT_BY_VIEWS = "+views";
const SORT_BY_DATE = "-createdAt";
const SHOW_BY_VIEWS = "trending";
const SHOW_BY_DATE = "recent";
const ACTIVE = styles.active;
const INACTIVE = styles.inactive;

const Main = (props) => {
  console.log("MAIN START!!");
  const [popularStudyList, setPopularStudyList] = useState([]);
  const [recentStudyList, setRecentStudyList] = useState([]);
  const [category, setCategory] = useState(SHOW_BY_DATE);
  const [styleDate, setStyleDate] = useState(ACTIVE);
  const [styleRecent, setStyleRecent] = useState(INACTIVE);
  const selectedLanguages = useSelector((state) => state.language);

  useEffect(() => {
    console.log("Main UseEffect!!");
    studyService //
      .getList(SORT_BY_DATE, selectedLanguages)
      .then((response) => {
        console.log("study list api 1 완료");
        setRecentStudyList(response.data);
      })
      .catch(console.error);

    studyService //
      .getList(SORT_BY_VIEWS, selectedLanguages)
      .then((response) => {
        console.log("study list api 2 완료");
        setPopularStudyList(response.data);
      })
      .catch(console.error);
  }, [selectedLanguages]);

  const toggleCategoryToDate = (e) => {
    if (category === SHOW_BY_DATE) return;
    setCategory((state) => SHOW_BY_DATE);
    setStyleDate((state) => ACTIVE);
    setStyleRecent((state) => INACTIVE);
  };

  const toggleCategoryToView = (e) => {
    console.log(e);
    if (category === SHOW_BY_VIEWS) return;
    setCategory((state) => SHOW_BY_VIEWS);
    setStyleDate((state) => INACTIVE);
    setStyleRecent((state) => ACTIVE);
  };

  return (
    <>
      <Navbar showRegisterButton={true} />
      <Banner />
      <div className={styles.languageBarWrapper}>
        <LanguageBarList />
      </div>
      <div className={styles.appWrapper}>
        <div className={styles.app}>
          <main className={styles.main}>
            <section className={styles.category}>
              <div
                className={`${styles.category__item} ${styleDate}`}
                onClick={toggleCategoryToDate}
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
                <span className={styles.text}>최신</span>
              </div>
              <div
                className={`${styles.category__item} ${styleRecent}`}
                onClick={toggleCategoryToView}
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
                <span className={styles.text}>트렌딩</span>
              </div>
            </section>
            {category === SHOW_BY_DATE ? (
              <StudyList studyList={recentStudyList}></StudyList>
            ) : (
              <StudyList studyList={popularStudyList}></StudyList>
            )}
          </main>
        </div>
      </div>
    </>
  );
};
export default Main;
