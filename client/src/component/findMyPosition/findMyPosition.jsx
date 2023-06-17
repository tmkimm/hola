import React from 'react';
import styles from './findMyPosition.module.css';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { changePosition } from 'store/language';
import { HolaLogEvent } from 'common/GA';

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
  }),
};

const options = [
  {
    label: '전체',
    value: 'ALL',
  },
  {
    label: '프론트엔드',
    value: 'FE',
  },
  {
    label: '백엔드',
    value: 'BE',
  },
  {
    label: 'IOS',
    value: 'IOS',
  },
  {
    label: '안드로이드',
    value: 'AND',
  },
  {
    label: '디자이너',
    value: 'DE',
  },
  {
    label: '기획자',
    value: 'PD',
  },
  {
    label: 'PM',
    value: 'PM',
  },
  {
    label: 'DevOps',
    value: 'DEVOPS',
  },
];

const FindMyPosition = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.selectWrapper}>
      <Select
        placeholder={'내 포지션 찾기'}
        styles={customStyles}
        isSearchable={false}
        options={options}
        onChange={(position) => {
          HolaLogEvent('filter_position', { category: position.value });
          dispatch(changePosition(position.value));
        }}
      />
    </div>
  );
};

export default FindMyPosition;
