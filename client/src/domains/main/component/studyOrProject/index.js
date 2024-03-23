import React from 'react';
import styles from './studyOrProject.module.css';
import { HolaLogEvent } from 'common/GA';
import { useDispatch } from 'react-redux';
import { changeMode } from 'store/language';

const active = {
  className: styles.active,
  color: '#333333',
};
const inActive = {
  className: styles.inactive,
  color: '#858E86',
};

const StudyOrProject = ({ category }) => {
  const ALL = 'all';
  const PROJECT = 'project';
  const STUDY = 'study';
  const dispatch = useDispatch();

  const toggleCategory = (toggleTo) => {
    HolaLogEvent(`filter_position`, { category: toggleTo });
    if (category === toggleTo) return;
    dispatch(changeMode(toggleTo));
  };

  return (
    <section className={styles.category}>
      <div
        className={`${styles.category__item} ${
          category === ALL ? active.className : inActive.className
        }`}
        onClick={() => {
          toggleCategory(ALL);
        }}
      >
        <span className={styles.text}>전체</span>
      </div>
      <div
        className={`${styles.category__item} ${
          category === PROJECT ? active.className : inActive.className
        }`}
        onClick={() => {
          toggleCategory(PROJECT);
        }}
      >
        <span className={styles.text}>프로젝트</span>
      </div>
      <div
        className={`${styles.category__item} ${
          category === STUDY ? active.className : inActive.className
        }`}
        onClick={() => {
          toggleCategory(STUDY);
        }}
      >
        <span className={styles.text}>스터디</span>
      </div>
    </section>
  );
};

export default StudyOrProject;
