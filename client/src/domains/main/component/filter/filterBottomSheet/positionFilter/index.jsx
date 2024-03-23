import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { positionsOption } from 'common/options';
import * as S from './styled';
import { changeField } from 'store/language';
import { HolaLogEvent } from 'common/GA';

const PositionFilter = () => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.language.position);

  return (
    <S.LanguageList>
      {positionsOption.map((types, idx) => (
        <S.LanguageItem
          key={idx}
          selected={position === types.value}
          onClick={() => {
            HolaLogEvent(`mobile_filter_position`, { category: types.value });
            dispatch(changeField({ key: 'position', value: types.value }));
          }}
        >
          {types.label}
        </S.LanguageItem>
      ))}
    </S.LanguageList>
  );
};

export default PositionFilter;
