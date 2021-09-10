import React, { useState } from "react";
import styles from "./main.module.css";

import Navbar from "component/nav_bar/navbar";
import Banner from "component/banner/banner";
import LanguageBarList from "component/language_bar_list/languageBarList";

import Rating from "component/rating/rating";
import ShowByDate from "component/show_studies/show_by_date/showByDate";
import ShowByViews from "component/show_studies/show_by_views/showByViews";

import { AiFillFire } from "react-icons/ai";
import { FaCalendarCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clear, init } from "store/language";

/* 
main page의 layout을 담당하는 component입니다. 
최신, 트렌딩 두가지의 기준으로 데이터를 보여줍니다.
*/

const SHOW_BY_VIEWS = "-views";
const SHOW_BY_DATE = "-createdAt";
const ACTIVE = styles.active;
const INACTIVE = styles.inactive;

const Main = () => {
  const [category, setCategory] = useState(SHOW_BY_DATE);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return; // 바꾸려는 대상이 현재 상태와 같으면 return

    if (category === SHOW_BY_VIEWS) setCategory((state) => SHOW_BY_DATE);
    else setCategory((state) => SHOW_BY_VIEWS);
  };

  const handleSelect = (e) => {
    if (checked) dispatch(clear());
    else dispatch(init());
    setChecked((checked) => !checked);
  };

  return (
    <>
      <Navbar />
      <Banner />
      <div className={styles.languageSelectBox}>
        <img
          className={styles.languagebarBubble}
          src="/images/info/languegeBar_bubble.png"
          alt="information"
        />
        <div className={styles.selectWrapper} onClick={handleSelect}>
          <input
            className={styles.selectboxInput}
            type="checkbox"
            name="languageSelect"
            value="전체 언어 보기"
            checked={checked ? "checked" : ""}
            readOnly
          ></input>
          <label htmlFor="languageSelect">
            <span>전체 언어 보기</span>
          </label>
        </div>
      </div>

      <div className={styles.languageBarWrapper}>
        <LanguageBarList setChecked={setChecked} />
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
                <FaCalendarCheck />
                <span className={styles.text}>최신</span>
              </div>

              <div
                className={`${styles.category__item} ${
                  category === SHOW_BY_DATE ? INACTIVE : ACTIVE
                }`}
                onClick={() => toggleCategory(SHOW_BY_VIEWS)}
              >
                <AiFillFire />
                <span className={styles.text}>인기</span>
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
