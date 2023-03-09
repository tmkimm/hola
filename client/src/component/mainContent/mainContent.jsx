import React, { useState } from 'react';
import styles from './mainContent.module.css';
import { Posts } from 'component/showPosts';
import { ToggleSwitch } from 'component/toggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'store/study';
import FindMyPosition from 'component/findMyPosition/findMyPosition';
import StudyOrProject from 'component/StudyOrProject/studyOrProject';

// API 정의, 전역 상태 정의, 호출까지
export const MainContent = () => {
  const [checked, setChecked] = useState(true);
  const category = useSelector((state) => state.study.mode);

  const dispatch = useDispatch();

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return; // 바꾸려는 대상이 현재 상태와 같으면 return
    dispatch(update(toggleTo));
  };

  const handleSelect = () => {
    setChecked((checked) => !checked);
  };

  return (
    <main className={styles.main}>
      <div className={styles.categoryWrapper}>
        <StudyOrProject category={category} toggleCategory={toggleCategory} />
        <FindMyPosition />
        <ToggleSwitch checked={checked} handleSelect={handleSelect} />
      </div>
      <div className={styles.appWrapper}>
        <Posts category={category} checked={checked} />
      </div>
    </main>
  );
};
