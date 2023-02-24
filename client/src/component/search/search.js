import React, { useState } from 'react';
import styles from './search.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from 'store/language';

const Search = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const value = useSelector((state) => state.search);
  return (
    <div className={styles.container}>
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
          placeholder='검색어를 입력해주세요'
          className={styles.searchInput}
          value={value}
          onChange={(e) => {
            dispatch(changeSearch(e.target.value));
          }}
        ></input>
      )}
    </div>
  );
};

export default Search;
