import React from 'react';
import * as S from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from 'store/language';

const typeOption = [
  { value: 'all', label: '전체' },
  { value: 'project', label: '프로젝트' },
  { value: 'study', label: '스터디' },
];

const StudyTypeFilter = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.language.mode);

  const toggleCategory = (toggleTo) => {
    if (category === toggleTo) return;
    dispatch(changeMode(toggleTo));
  };

  return (
    <S.LanguageList>
      {typeOption.map((types) => (
        <S.LanguageItem
          selected={category === types.value}
          onClick={() => toggleCategory(types.value)}
        >
          {types.label}
        </S.LanguageItem>
      ))}
    </S.LanguageList>
  );
};

export default StudyTypeFilter;
