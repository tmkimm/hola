import React from 'react';
import Select from 'react-select';
import styles from './selectbox.module.css';

export const Selectbox = ({
  labelText,
  customStyles,
  options,
  selectValue,
  setSelectValue,
  placeholder,
}) => {
  const selectStyle = {
    control: (css) => ({
      ...css,
      ...customStyles,
    }),
  };
  return (
    <>
      {labelText && (
        <label className={styles.labelText} htmlFor='onoffline'>
          {labelText}
        </label>
      )}
      <Select
        styles={selectStyle}
        placeholder={placeholder}
        name='onoffline'
        options={options}
        classNamePrefix='select'
        value={selectValue}
        onChange={(value) => {
          setSelectValue(value);
        }}
      />
    </>
  );
};
