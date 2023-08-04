import React from 'react';
import styles from './mainContent.module.css';
import { ToggleSwitch } from 'component/toggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode, changeVisibleOpenOnly } from 'store/language';
import FindMyPosition from 'component/findMyPosition/findMyPosition';
import StudyOrProject from 'component/StudyOrProject/studyOrProject';
import Posts from '../showPosts/posts';

export const MainContent = () => {
  const category = useSelector((state) => state.language.mode);
  const isClosed = useSelector((state) => state.language.isClosed);
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
        <FindMyPosition />
        <ToggleSwitch checked={!isClosed} handleSelect={handleSelect} />
      </div>
      <Posts />
    </main>
  );
};
