import React from 'react';
import styles from './mainContent.module.css';
import { Posts } from 'component/showPosts';
import { ToggleSwitch } from 'component/toggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode, changeVisibleOpenOnly } from 'store/language';
import FindMyPosition from 'component/findMyPosition/findMyPosition';
import StudyOrProject from 'component/StudyOrProject/studyOrProject';
import PostTemp from 'component/showPosts/postTemp';

export const MainContent = () => {
  const category = useSelector((state) => state.language.mode);
  const visibleOpenOnly = useSelector((state) => state.language.visibleOpenOnly);
  const dispatch = useDispatch();

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return;
    dispatch(changeMode(toggleTo));
  };

  const handleSelect = () => {
    dispatch(changeVisibleOpenOnly(!visibleOpenOnly));
  };

  return (
    <main className={styles.main}>
      <div className={styles.categoryWrapper}>
        <StudyOrProject category={category} toggleCategory={toggleCategory} />
        <FindMyPosition />
        <ToggleSwitch checked={visibleOpenOnly} handleSelect={handleSelect} />
      </div>
      <div className={styles.appWrapper}>
        <PostTemp />
      </div>
    </main>
  );
};
