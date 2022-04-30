import React, { useState } from 'react';
import styles from './mainContent.module.css';
import ShowByDate from 'component/show_studies/show_by_date/showByDate';
import ShowByViews from 'component/show_studies/show_by_views/showByViews';
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
        <ShowByDate category={category} checked={checked} />
      ) : (
        <ShowByViews category={category} checked={checked} />
      )}
    </main>
  );
};
