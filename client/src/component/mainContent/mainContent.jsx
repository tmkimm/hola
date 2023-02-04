import React, { useState } from 'react';
import styles from './mainContent.module.css';
import { Posts } from 'component/showPosts';
import { StudyIcon, ProjectIcon } from 'common/Icons';
import { ToggleSwitch } from 'component/toggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'store/study';
import { AllIcon } from 'common/Icons/allIcon';
import Select from 'react-select';

const customStyles = {
  control: (base, state) => ({
    ...base,
    width: '190px',
    height: '42px',
    background: 'white',
    border: '1.5px solid #E3E3E3',
    borderRadius: '36px',
    boxShadow: state.isFocused ? null : null,
  }),
  indicatorSeparator: (base) => ({ ...base, display: 'none' }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px',
    fontWeight: '600',
    fontSize: '18px',
    letterSpacing: '0.03em',
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '190px',
    background: '#FFFFFF',
    border: '1.5px solid #E3E3E3',
    borderRadius: '25px',
    boxShadow: state.isFocused ? null : null,
    padding: '20px',
  }),
  option: (provided) => ({
    ...provided,
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '26px',
    letterSpacing: '-0.03em',
    color: '#646464',
    backgroundColor: 'null',
    cursor: 'pointer',
  }),
};

const options = [
  {
    label: '프론트엔드',
    value: 1,
  },
  {
    label: '백엔드',
    value: 2,
  },
  {
    label: 'IOS',
    value: 3,
  },
  {
    label: '안드로이드',
    value: 4,
  },
  {
    label: 'DevOps',
    value: 5,
  },
  {
    label: '디자이너',
    value: 6,
  },
  {
    label: 'PM',
    value: 7,
  },
];

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

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return; // 바꾸려는 대상이 현재 상태와 같으면 return
    dispatch(update(toggleTo));
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

        <div className={styles.selectWrapper}>
          <Select
            placeholder={'내 포지션 찾기'}
            styles={customStyles}
            isSearchable={false}
            options={options}
          />
        </div>

        <ToggleSwitch checked={checked} handleSelect={handleSelect} />
      </div>
      <div className={styles.appWrapper}>
        <Posts category={category} checked={checked} />
      </div>
    </main>
  );
};
