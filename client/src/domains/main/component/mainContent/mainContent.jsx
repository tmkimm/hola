import React from 'react';
import styles from './mainContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode, changeVisibleOpenOnly } from 'store/language';
import StudyOrProject from 'component/StudyOrProject/studyOrProject';
import Posts from '../../../../component/showPosts/posts';
import Filter from '../filter';

export const MainContent = () => {
  const category = useSelector((state) => state.language.mode);
  const isClosed = useSelector((state) => state.language.isClosed);
  const lang = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return;
    dispatch(changeMode(toggleTo));
  };

  const handleSelect = () => {
    dispatch(changeVisibleOpenOnly(!isClosed));
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
