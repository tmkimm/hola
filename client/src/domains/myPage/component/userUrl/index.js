import React from 'react';
import {
  languageList,
  positionsExceptAllOption,
  urlOption,
  workExperienceOption,
} from 'common/options';
import CustomOption from 'domains/myPage/component/customOption';
import Select from 'react-select';
import * as S from './styled';

const customStyles2 = {
  control: (css) => ({
    ...css,
    width: '340px',
    minHeight: '3rem',
  }),
};

const UserUrl = ({ content, type }) => {
  return (
    <S.UrlGroup>
      <input value={content} />
      <Select styles={customStyles2} components={{ Option: CustomOption }} options={urlOption} />
    </S.UrlGroup>
  );
};

export default UserUrl;
