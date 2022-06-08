import React, { useState } from 'react';
import styles from './mainContent.module.css';
import { Posts } from 'component/showPosts';
import { StudyIcon, ProjectIcon } from 'common/Icons';
import { ToggleSwitch } from 'component/toggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'store/study';
import { AllIcon } from 'common/Icons/allIcon';

export const MainContent = () => {
  const ALL = 'all';
  const PROJECT = 'project';
  const STUDY = 'study';

  const active = {
    className: styles.active,
    color: '#333333',
  };
  const inActive = {
    className: styles.inactive,
    color: '#858E86',
  };

  const category = useSelector((state) => state.study.mode);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return; // 바꾸려는 대상이 현재 상태와 같으면 return
    setPageNumber(0);

    dispatch(update(toggleTo));
  };

  const handleSelect = () => {
    setPageNumber(0);
    setChecked((checked) => !checked);
  };

  return (
    <main className={styles.main}>
      <div className={styles.categoryWrapper}>
        <section className={styles.category}>
          <div
            className={`${styles.category__item} ${
              category === ALL ? active.className : inActive.className
            }`}
            onClick={() => toggleCategory(ALL)}
          >
            <AllIcon stroke={category === ALL ? active.color : inActive.color} />
            <span className={styles.text}>전체</span>
          </div>
          <div
            className={`${styles.category__item} ${
              category === PROJECT ? active.className : inActive.className
            }`}
            onClick={() => toggleCategory(PROJECT)}
          >
            <ProjectIcon stroke={category === PROJECT ? active.color : inActive.color} />
            <span className={styles.text}>프로젝트</span>
          </div>
          <div
            className={`${styles.category__item} ${
              category === STUDY ? active.className : inActive.className
            }`}
            onClick={() => toggleCategory(STUDY)}
          >
            <StudyIcon stroke={category === STUDY ? active.color : inActive.color} />
            <span className={styles.text}>스터디</span>
          </div>
        </section>

        <ToggleSwitch checked={checked} handleSelect={handleSelect} />
      </div>
      <div className={styles.appWrapper}>
        <Posts
          category={category}
          checked={checked}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </main>
  );
};
