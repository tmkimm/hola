import React from 'react';
import Select from 'react-select';
import styles from './selectbox.module.css';

export const Selectbox = ({
  labelText,
  isMulti,
  customStyles,
  options,
  selectValue,
  setSelectValue,
  placeholder,
  id,
  maxValue,
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
        isMulti={isMulti}
        styles={selectStyle}
        placeholder={placeholder}
        isOptionDisabled={() => selectValue.length >= maxValue ?? 5}
        name='onoffline'
        options={options}
        classNamePrefix='select'
        value={selectValue}
        onChange={(value) => {
          setSelectValue({ key: id, value: value });
        }}
      />
    </>
  );
};
