import LanguageBarList from 'component/language_bar_list/languageBarList';
import React from 'react';
import styles from './mobileFilter.module.css';

/* Todo : LanguageBarList 데스크탑/모바일 별도로 관리할 건지 결정 필요 */

export const MobileCategory = React.memo(() => {
  return (
    <>
      <div className={styles.languageSelectBox}>
        <img
          className={styles.languagebarBubble}
          src='/images/info/languegeBar_bubble.png'
          alt='information'
        />
      </div>

      <div className={styles.languageBarWrapper}>
        <LanguageBarList />
      </div>
    </>
  );
});
