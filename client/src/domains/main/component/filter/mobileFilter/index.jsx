import React from 'react';
import * as S from './styled';
import Search from '../../search/search';
import FilterButton from './FilterButton';

const MobileFilter = () => {
  return (
    <>
      <S.Container>
        <Search />
        <S.ButtonContainer>
          <FilterButton buttonText='기술 스택' isSelected={false} />
          <FilterButton buttonText='모집 구분' isSelected={false} />
          <FilterButton buttonText='포지션' isSelected={false} />
          <FilterButton buttonText='진행 방식' isSelected={false} />
          <FilterButton buttonText='모집중 보기' isSelected={false} />
        </S.ButtonContainer>
      </S.Container>
      <S.Separator />
    </>
  );
};

export default MobileFilter;
