import React from 'react';
import styles from './studyOrProject.module.css';
import { StudyIcon, ProjectIcon } from 'common/Icons';
import { AllIcon } from 'common/Icons/allIcon';
import { HolaLogEvent } from 'common/GA';

const StudyOrProject = ({ category, toggleCategory }) => {
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

  return (
    <section className={styles.category}>
      <div
        className={`${styles.category__item} ${
          category === ALL ? active.className : inActive.className
        }`}
        onClick={() => {
          toggleCategory(ALL);
          HolaLogEvent('filter_type', { category: 'all' });
        }}
      >
        <AllIcon stroke={category === ALL ? active.color : inActive.color} />
        <span className={styles.text}>전체</span>
      </div>
      <div
        className={`${styles.category__item} ${
          category === PROJECT ? active.className : inActive.className
        }`}
        onClick={() => {
          HolaLogEvent('filter_type', { category: 'project' });
          toggleCategory(PROJECT);
        }}
      >
        <ProjectIcon stroke={category === PROJECT ? active.color : inActive.color} />
        <span className={styles.text}>프로젝트</span>
      </div>
      <div
        className={`${styles.category__item} ${
          category === STUDY ? active.className : inActive.className
        }`}
        onClick={() => {
          HolaLogEvent('filter_type', { category: 'study' });
          toggleCategory(STUDY);
        }}
      >
        <StudyIcon stroke={category === STUDY ? active.color : inActive.color} />
        <span className={styles.text}>스터디</span>
      </div>
    </section>
  );
};

export default StudyOrProject;
