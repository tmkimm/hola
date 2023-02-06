import React from 'react';
import styles from './findMyPosition.module.css';
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
  menuList: (base) => ({
    ...base,
    overflow: 'hidden',
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

const FindMyPosition = () => {
  return (
    <div className={styles.selectWrapper}>
      <Select
        placeholder={'내 포지션 찾기'}
        styles={customStyles}
        isSearchable={false}
        options={options}
      />
    </div>
  );
};

export default FindMyPosition;
