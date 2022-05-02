import React, { useState } from 'react';
import { Datepicker } from 'component/datepicker';
import { Input } from 'component/input';
import Select from 'react-select';
import styles from './postinfo.module.css';

export const PostInfo = () => {
  const [mo, setMo] = useState('online');
  const customStyles = {
    control: (css) => ({
      ...css,
      width: '100%',
      minHeight: '56px',
      height: '56px',
    }),
  };

  const options = [
    { value: 'online', label: '온라인' },
    { value: 'offline', label: '오프라인' },
  ];
  return (
    <>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <label className={styles.labelText} htmlFor='onoffline'>
            진행 방식
          </label>
          <Select
            styles={customStyles}
            placeholder={'온라인/오프라인'}
            name='onoffline'
            options={options}
            classNamePrefix='select'
            value={mo}
            onChange={(value) => {
              setMo(value);
            }}
          />
        </li>
        <li className={styles.listItem}>
          <Datepicker />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Input labelText='모집 인원 (미정~10)' />
        </li>
        <li className={styles.listItem}>
          <Input labelText='진행 기간' />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Input labelText='진행 방식 (온라인/오프라인)' />
        </li>
        <li className={styles.listItem}>
          <Input labelText='연락 방법' />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Input labelText='오픈 톡 링크' />
        </li>
        <li className={styles.listItem}>
          <Input labelText='기술 스택' />
        </li>
      </ul>
    </>
  );
};
