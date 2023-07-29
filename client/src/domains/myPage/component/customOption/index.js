import React from 'react';
import * as S from './styled';

const CustomOption = ({ innerProps, isDisabled, ...props }) => {
  const { label } = props;
  const [firstLetter, ...rest] = label;

  return !isDisabled ? (
    <S.Container {...innerProps}>
      <S.LogoImg src={`/images/logo/${firstLetter.toLowerCase()}${rest.join('')}.png`} />
      <S.Label>{props.data.label}</S.Label>
    </S.Container>
  ) : null;
};

export default CustomOption;
