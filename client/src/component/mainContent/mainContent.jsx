import React, { useState } from 'react';
import styles from './mainContent.module.css';
import ShowByDate from 'component/showPosts/projects/projects';
import ShowByViews from 'component/showPosts/studies/studies';
import { Projects, Studies } from 'component/showPosts';
import { StudyIcon, ProjectIcon } from 'common/Icons';
import { ToggleSwitch } from 'component/toggleSwitch';

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

  const [category, setCategory] = useState(PROJECT);
  const [checked, setChecked] = useState(true);

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return; // 바꾸려는 대상이 현재 상태와 같으면 return

    if (category === PROJECT) setCategory(STUDY);
    else setCategory(PROJECT);
  };

  const handleSelect = () => {
    setChecked((checked) => !checked);
  };

  return (
    <main className={styles.main}>
      <div className={styles.categoryWrapper}>
        <section className={styles.category}>
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
      {category === PROJECT ? (
        <Projects category={category} checked={checked} />
      ) : (
        <Studies category={category} checked={checked} />
      )}
    </main>
  );
};
