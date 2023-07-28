import React from 'react';
import styles from './mainContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, changeMode, changeVisibleOpenOnly } from 'store/language';
import StudyOrProject from 'component/StudyOrProject/studyOrProject';
import Posts from '../../../../component/showPosts/posts';
import Select from 'react-select';

import { languageList, onlineOrOfflineOption, positionsOption, sortOption } from 'common/options';
import { Selectbox } from 'component/select';

export const MainContent = () => {
  const category = useSelector((state) => state.language.mode);
  const isClosed = useSelector((state) => state.language.isClosed);
  const lang = useSelector((state) => state.language);
  console.log('lang :', lang);
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
        <div className={styles.selectWrapper}>
          {/* <CommonSelect options={sortOption} placeholder='최신순' /> */}
          <Select
            options={languageList}
            placeholder='기술 스택'
            // onChange={(e) => {
            //   const { value } = e;
            //   handleField({ key: 'selected', value });
            // }}
          />
          <Select
            options={positionsOption}
            placeholder='포지션'
            onChange={(e) => {
              const { value } = e;
              dispatch(changeField({ key: 'position', value }));
            }}
          />
          <Select options={onlineOrOfflineOption} placeholder='진행 방식' />
          <div className={styles.categoryItem}>👋 내 북마크 보기</div>
          <div className={styles.categoryItem}>👀 모집 중만 보기</div>
        </div>
      </div>
      <div className={styles.appWrapper}>
        <Posts />
      </div>
    </main>
  );
};
