import React, { useState } from 'react';
import * as S from './styled';
import Search from '../../search/search';
import FilterButton from './FilterButton';
import FilterBottomSheet from '../filterBottomSheet';
import { useSelector } from 'react-redux';
import { capitalize } from 'common/utils';
import { onlineOrOfflineOption, positionsOption } from 'common/options';

const MobileFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [curCategory, setCurCategory] = useState('기술스택');
  const { selected, isClosed, onOffLine, mode, position } = useSelector((state) => state.language);

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
            buttonText={
              selected.length === 0
                ? '기술 스택'
                : selected.map((lang) => capitalize(lang)).join(', ')
            }
            isSelected={selected.length !== 0}
            onClick={() => handleClick('기술스택')}
          />
          <FilterButton
            buttonText={mode === 'all' ? '모집 구분' : mode === 'study' ? '스터디' : '프로젝트'}
            isSelected={mode !== 'all'}
            onClick={() => handleClick('모집구분')}
          />
          <FilterButton
            buttonText={
              position === 'ALL'
                ? '포지션'
                : positionsOption.find((pos) => pos.value === position).label
            }
            isSelected={position !== 'ALL'}
            onClick={() => handleClick('포지션')}
          />
          <FilterButton
            buttonText={
              onOffLine === 'ALL'
                ? '진행 방식'
                : onlineOrOfflineOption.find((v) => v.value === onOffLine).label
            }
            isSelected={onOffLine !== 'ALL'}
            onClick={() => handleClick('진행방식')}
          />
          <FilterButton
            buttonText={isClosed ? '마감여부' : '모집 중만 보기'}
            isSelected={!isClosed}
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
