import React from 'react';
import styles from './badge.module.css';

const getClass = (state) => {
  if (state === 'new') return styles.new;
  else if (state === 'deadline') return styles.deadline;
  return styles.hot;
};

const Badge = ({ state }) => {
  const badgeClass = styles.new; //`${styles}.${state}`;
  console.log(badgeClass);
  const studyState = {
    new: '🍞 따끈따끈 새 글',
    deadline: '🔥 마감코앞',
    hot: '💙 인기',
  };

  return (
    <div className={`${styles.badge}`}>
      <span className={getClass(state)}>{studyState[state]}</span>
    </div>
  );
};

export default Badge;
