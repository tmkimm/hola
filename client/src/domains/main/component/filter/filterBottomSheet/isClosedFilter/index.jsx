import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './styled';
import { changeField } from 'store/language';
import { HolaLogEvent } from 'common/GA';

const isClosedOption = [
  { value: false, label: '모집 중만 보기' },
  { value: true, label: '전체 글 보기' },
];

const IsClosedFilter = () => {
  const dispatch = useDispatch();
  const isClosed = useSelector((state) => state.language.isClosed);

  return (
    <S.LanguageList>
      {isClosedOption.map((types, idx) => (
        <S.LanguageItem
          key={idx}
          selected={isClosed === types.value}
          onClick={() => {
            HolaLogEvent(`mobile_filter_open_only`, { category: types.value });
            dispatch(changeField({ key: 'isClosed', value: types.value }));
          }}
        >
          {types.label}
        </S.LanguageItem>
      ))}
    </S.LanguageList>
  );
};

export default IsClosedFilter;
