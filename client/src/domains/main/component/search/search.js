import React, { useState } from 'react';
import styles from './search.module.css';
import { useDispatch } from 'react-redux';
import { changeSearch } from 'store/language';
import { HolaLogEvent } from 'common/GA';

const Search = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  return (
    <div
      className={styles.container}
      onClick={() => {
        HolaLogEvent('select_search');
      }}
    >
      <img className={styles.searchImg} src='images/info/search.png' alt='search icon' />

      <input
        placeholder='제목, 글 내용을 검색해보세요.'
        className={styles.searchInput}
        value={inputValue}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            if (inputValue === '') return;

            HolaLogEvent('select_search', { category: inputValue });
            dispatch(changeSearch(inputValue));
          }
        }}
        onChange={(e) => {
          const { value } = e.target;
          setInputValue(value);
          if (value === '') dispatch(changeSearch(''));
        }}
      ></input>
      {inputValue && (
        <img
          onClick={() => {
            setInputValue('');
            dispatch(changeSearch(''));
          }}
          className={styles.searchInitialize}
          src='images/info/search-close-icon.png'
          alt='검색 내용 초기화'
        />
      )}
    </div>
  );
};

export default Search;
