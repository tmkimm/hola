import React, { useEffect, useState } from 'react';
import styles from './search.module.css';

const Search = ({
  placeholder = '제목, 글 내용을 검색해보세요.',
  defaultValue,
  handleSubmit,
  handleChange,
  handleRemoveClick,
  handleSearchAreaClick,
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    //HACK:: 초기 state 업데이트 후 sync를 맞춰주기 위해 effect를 사용합니다.
    if (defaultValue === null) return;
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <div
      className={styles.container}
      onClick={() => {
        handleSearchAreaClick();
      }}
    >
      <img className={styles.searchImg} src='images/info/search.png' alt='search icon' />

      <input
        placeholder={placeholder}
        className={styles.searchInput}
        value={inputValue}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(inputValue);
          }
        }}
        onChange={(e) => {
          const { value } = e.target;
          setInputValue(value);
          handleChange(value);
        }}
      ></input>
      {inputValue && (
        <img
          onClick={() => {
            setInputValue('');
            handleRemoveClick();
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
