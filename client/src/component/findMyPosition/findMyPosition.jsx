import React from 'react';
import styles from './findMyPosition.module.css';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { changePosition } from 'store/language';

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

/*        description: '포지션(FE: 프론트엔드, BE: 백엔드, DE: 디자이너, IOS: IOS, AND: 안드로이드, DEVOPS: DevOps, PM)' */
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
    label: 'DevOps',
    value: 'DEVOPS',
  },
  {
    label: '디자이너',
    value: 'DE',
  },
  {
    label: 'PM',
    value: 'PM',
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
          dispatch(changePosition(position.value));
        }}
      />
    </div>
  );
};

export default FindMyPosition;
