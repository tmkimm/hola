import React from 'react';
import Select from 'react-select';
import { languageList } from 'common/options';

const LikeLanguages = ({ likeLanguages, setLikeLanguages, placeholder }) => {
  const customStyles = {
    control: (css) => ({
      ...css,
      maxWidth: '500px',
      width: '100%',
      minHeight: '3rem',
    }),
  };

  return (
    <Select
      isMulti
      styles={customStyles}
      placeholder={placeholder}
      name='likeLanguages'
      options={languageList}
      classNamePrefix='select'
      value={likeLanguages}
      onChange={(value) => {
        setLikeLanguages(value);
      }}
    />
  );
};

export default LikeLanguages;
