import React from 'react';
import * as S from './styled';

const FilterContent = ({ options, currentValue, handleClick }) => {
  return (
    <S.LanguageList>
      {options.map((types, idx) => (
        <S.LanguageItem
          key={idx}
          selected={currentValue === types.value}
          onClick={() => handleClick(types.value)}
        >
          {types.label}
        </S.LanguageItem>
      ))}
    </S.LanguageList>
  );
};

export default FilterContent;
