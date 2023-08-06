import React, { useState } from 'react';
import * as S from './styled';
import Search from '../../search/search';
import FilterButton from './FilterButton';
import FilterBottomSheet from '../filterBottomSheet';

const MobileFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [curCategory, setCurCategory] = useState('기술스택');
  const handleClick = (category) => {
    setCurCategory(category);
    setIsOpen(true);
  };
  return (
    <>
      <S.Container>
        <Search />
        <S.ButtonContainer>
          <FilterButton
            buttonText='기술 스택'
            isSelected={false}
            onClick={() => handleClick('기술스택')}
          />
          <FilterButton
            buttonText='모집 구분'
            isSelected={false}
            onClick={() => handleClick('모집구분')}
          />
          <FilterButton
            buttonText='포지션'
            isSelected={false}
            onClick={() => handleClick('포지션')}
          />
          <FilterButton
            buttonText='진행 방식'
            isSelected={false}
            onClick={() => handleClick('진행방식')}
          />
          <FilterButton
            buttonText='마감여부'
            isSelected={false}
            onClick={() => handleClick('마감여부')}
          />
        </S.ButtonContainer>
      </S.Container>
      <S.Separator />
      <FilterBottomSheet
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        curCategory={curCategory}
        setCurCategory={setCurCategory}
      />
    </>
  );
};

export default MobileFilter;
