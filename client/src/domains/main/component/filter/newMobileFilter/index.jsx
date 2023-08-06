import React from 'react';
import * as S from './styled';
import Search from '../../search/search';

const MobileFilter = () => {
  return (
    <>
      <S.Container>
        <Search />
      </S.Container>
      <S.Separator />
    </>
  );
};

export default MobileFilter;
