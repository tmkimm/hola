import styles from "./main.module.css";
import { useState } from "react";

import Navbar from "../../component/nav_bar/navbar";
import Banner from "../../component/banner/banner";
import React from "react";
import LanguageBarList from "../../component/language_bar_list/languageBarList";

import Rating from "../../component/rating/rating";
import ShowByDate from "../../component/show_studies/show_by_date/showByDate";
import ShowByViews from "../../component/show_studies/show_by_views/showByViews";

/* 

main page의 layout을 담당하는 component입니다. 
최신, 트렌딩 두가지의 기준으로 데이터를 보여줍니다.

*/

const SHOW_BY_VIEWS = "-views";
const SHOW_BY_DATE = "-createdAt";
const ACTIVE = styles.active;
const INACTIVE = styles.inactive;

const Main = (props) => {
  console.log("MAIN START!!");

  const [category, setCategory] = useState(SHOW_BY_DATE);

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return; // 바꾸려는 대상이 현재 상태와 같으면 return

    if (category === SHOW_BY_VIEWS) setCategory((state) => SHOW_BY_DATE);
    else setCategory((state) => SHOW_BY_VIEWS);
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
                className={`${styles.category__item} ${
                  category === SHOW_BY_DATE ? ACTIVE : INACTIVE
                }`}
                onClick={() => toggleCategory(SHOW_BY_DATE)}
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
                className={`${styles.category__item} ${
                  category === SHOW_BY_DATE ? INACTIVE : ACTIVE
                }`}
                onClick={() => toggleCategory(SHOW_BY_VIEWS)}
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
            {category === SHOW_BY_DATE ? <ShowByDate /> : <ShowByViews />}
          </main>
        </div>
        <Rating />
      </div>
    </>
  );
};
export default Main;
