import React from 'react';
import styles from './mainContent.module.css';
import Filter from '../filter';
import Posts from '../posts/posts';

export const MainContent = () => {
  return (
    <main className={styles.main}>
      <Filter />
      <Posts />
    </main>
  );
};
