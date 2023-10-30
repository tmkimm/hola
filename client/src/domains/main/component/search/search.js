import React, { useState } from 'react';
import styles from './search.module.css';

const Search = ({
  handleSubmit,
  handleChange,
  handleSearchAreaClick,
  handleRemoveClick,
  defaultValue = '',
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(null);
  const defaultInputValue = defaultValue || '';

  return (
    <div
      className={styles.container}
      onClick={() => {
        HolaLogEvent('select_search_click');
      }}
    >
      <img className={styles.searchImg} src='images/info/search.png' alt='search icon' />

      <input
        placeholder={placeholder}
        className={styles.searchInput}
        value={inputValue ?? defaultInputValue}
        onKeyPress={(e) => {
          //NOTE: enter key 입력시에만 전역 state와 sync합니다.
          if (e.key === 'Enter') {
            if (inputValue === '') return;

            HolaLogEvent('select_search', { category: inputValue, input: inputValue });
            dispatch(changeSearch(inputValue));
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
