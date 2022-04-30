import React, { useState } from 'react';
import styles from './mainContent.module.css';
import ShowByDate from 'component/show_studies/show_by_date/showByDate';
import ShowByViews from 'component/show_studies/show_by_views/showByViews';
import { StudyIcon, ProjectIcon } from 'common/Icons';

export const MainContent = () => {
  const SHOW_BY_VIEWS = '-views';
  const SHOW_BY_DATE = '-createdAt';
  const active = {
    className: styles.active,
    color: '#333333',
  };
  const inActive = {
    className: styles.inactive,
    color: '#858E86',
  };

  const [category, setCategory] = useState(SHOW_BY_DATE);
  const [checked, setChecked] = useState(true);

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return; // 바꾸려는 대상이 현재 상태와 같으면 return

    if (category === SHOW_BY_VIEWS) setCategory(SHOW_BY_DATE);
    else setCategory(SHOW_BY_VIEWS);
  };

  const handleSelect = (e) => {
    setChecked((checked) => !checked);
  };
  return (
    <main className={styles.main}>
      <div className={styles.categoryWrapper}>
        <section className={styles.category}>
          <div
            className={`${styles.category__item} ${
              category === SHOW_BY_DATE ? active.className : inActive.className
            }`}
            onClick={() => toggleCategory(SHOW_BY_DATE)}
          >
            <ProjectIcon stroke={category === SHOW_BY_DATE ? active.color : inActive.color} />
            <span className={styles.text}>프로젝트</span>
          </div>

          <div
            className={`${styles.category__item} ${
              category === SHOW_BY_DATE ? inActive.className : active.className
            }`}
            onClick={() => toggleCategory(SHOW_BY_VIEWS)}
          >
            <StudyIcon stroke={category === SHOW_BY_VIEWS ? active.color : inActive.color} />
            <span className={styles.text}>스터디</span>
          </div>
        </section>
        <div className={styles.selectWrapper} onClick={handleSelect}>
          <input
            className={styles.selectboxInput}
            type='checkbox'
            name='languageSelect'
            value='마감 글 보기'
            checked={checked ? 'checked' : ''}
            readOnly
          ></input>
          <label htmlFor='languageSelect'>
            <span className={styles.selectTitle}>모집 중만 보기</span>
          </label>
        </div>
      </div>
      {category === SHOW_BY_DATE ? (
        <ShowByDate checked={checked} />
      ) : (
        <ShowByViews checked={checked} />
      )}
    </main>
  );
};
