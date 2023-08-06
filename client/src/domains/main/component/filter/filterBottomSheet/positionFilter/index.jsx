import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { positionsOption } from 'common/options';
import * as S from './styled';
import { changeField } from 'store/language';

const PositionFilter = () => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.language.position);

  return (
    <S.LanguageList>
      {positionsOption.map((types) => (
        <S.LanguageItem
          selected={position === types.value}
          onClick={() => dispatch(changeField({ key: 'position', value: types.value }))}
        >
          {types.label}
        </S.LanguageItem>
      ))}
    </S.LanguageList>
  );
};

export default PositionFilter;
