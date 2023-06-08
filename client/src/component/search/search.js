import React, { useState } from 'react';
import styles from './search.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from 'store/language';
import { HolaLogEvent } from 'common/GA';

const debounceFunction = (callback, delay) => {
  let timer;
  return (...args) => {
    // 실행한 함수(setTimeout())를 취소
    clearTimeout(timer);
    // delay가 지나면 callback 함수를 실행
    timer = setTimeout(() => callback(...args), delay);
  };
};

const Search = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const value = useSelector((state) => state.search);
  const debouncedOnchange = debounceFunction((e) => {
    HolaLogEvent('select_search', { category: e.target.value });
    dispatch(changeSearch(e.target.value));
  }, 300);

  return (
    <div
      className={styles.container}
      onClick={() => {
        HolaLogEvent('select_search');
      }}
    >
      <img
        className={styles.searchImg}
        src='images/info/search.png'
        alt='sub logo'
        onClick={() => {
          if (isVisible) return;
          setIsVisible(!isVisible);
        }}
      />
      {isVisible && (
        <input
          placeholder='제목, 게시글 검색'
          className={styles.searchInput}
          value={value}
          onChange={debouncedOnchange}
        ></input>
      )}
    </div>
  );
};

export default Search;
