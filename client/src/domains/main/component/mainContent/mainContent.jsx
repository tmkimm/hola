import React from 'react';
import styles from './mainContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from 'store/language';
import StudyOrProject from 'component/StudyOrProject/studyOrProject';
import Filter from '../filter';
import Posts from '../posts/posts';

export const MainContent = () => {
  const category = useSelector((state) => state.language.mode);
  const dispatch = useDispatch();

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return;
    dispatch(changeMode(toggleTo));
  };

  return (
    <main className={styles.main}>
      <div className={styles.categoryWrapper}>
        <StudyOrProject category={category} toggleCategory={toggleCategory} />
        <Filter />
      </div>
      <Posts />
    </main>
  );
};
