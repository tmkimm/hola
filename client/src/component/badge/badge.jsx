import React from 'react';
import styles from './badge.module.css';

const getClass = (state) => {
  if (state === 'new') return styles.new;
  else if (state === 'deadline') return styles.deadline;
  else if (state === 'project' || state === 'study') return styles.study;
  return styles.hot;
};

const Badge = ({ state }) => {
  if (state === '') return null;

  const studyState = {
    new: '🍞 따끈따끈 새 글',
    deadline: '🔥 마감코앞',
    hot: '💙 인기',
    study: '✏️ 스터디',
    project: '🗂 프로젝트',
  };

  return (
    <div className={`${styles.badge}`}>
      {state ? <div className={getClass(state)}>{studyState[state]}</div> : null}
    </div>
  );
};

export default Badge;
