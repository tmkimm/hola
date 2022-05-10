import React, { useState } from 'react';
import styles from './mainContent.module.css';
import { Projects, Studies } from 'component/showPosts';
import { StudyIcon, ProjectIcon } from 'common/Icons';
import { ToggleSwitch } from 'component/toggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'store/study';

export const MainContent = () => {
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

    if (category === PROJECT) dispatch(update(STUDY));
    else dispatch(update(PROJECT));
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
              category === STUDY ? active.className : inActive.className
            }`}
            onClick={() => toggleCategory(STUDY)}
          >
            <StudyIcon stroke={category === STUDY ? active.color : inActive.color} />
            <span className={styles.text}>스터디</span>
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
        </section>
        <div className={styles.udemyWrapper}>
          <a
            href='https://sturdy-dugout-e49.notion.site/Udemy-X-Hola-Study-with-Me-5299159dd78e424181c8cdbf7d5be46c'
            target='_blank'
            className={styles.udemy}
            rel='noreferrer'
          >
            #무료강의로 스터디
          </a>
          <ToggleSwitch checked={checked} handleSelect={handleSelect} />
        </div>
      </div>
      <div className={styles.appWrapper}>
        {category === PROJECT ? (
          <Projects
            category={category}
            checked={checked}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        ) : (
          <Studies
            category={category}
            checked={checked}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        )}
      </div>
    </main>
  );
};
