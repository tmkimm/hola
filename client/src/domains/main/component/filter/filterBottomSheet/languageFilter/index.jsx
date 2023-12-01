import React from 'react';
import * as S from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { HolaLogEvent } from 'common/GA';
import { addLanguage, initLanguage, removeLanguage } from 'store/language';
import { languageMap } from 'common/options';

const languages = [
  'JavaScript',
  'TypeScript',
  'React',
  'Vue',
  'Svelte',
  'Nextjs',
  'Nodejs',
  'Java',
  'Spring',
  'Go',
  'Nestjs',
  'Kotlin',
  'Express',
  'MySQL',
  'MongoDB',
  'Python',
  'Django',
  'php',
  'GraphQL',
  'Firebase',
  'Flutter',
  'Swift',
  'ReactNative',
  'Unity',
  'AWS',
  'Kubernetes',
  'Docker',
  'Git',
  'Figma',
  'Zeplin',
  'Jest',
];

const LanguageFilter = () => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.language);

  const onLanguageClick = (language, isSelected) => {
    if (!isSelected) {
      HolaLogEvent('filter_language', {
        category: language,
        select_language: language,
        user_agent: 'mobile',
      });
      dispatch(addLanguage(language));
    } else {
      selected.length === 1 ? dispatch(initLanguage()) : dispatch(removeLanguage(language));
    }
  };

  return (
    <S.LanguageList>
      {languages.map((lang, idx) => (
        <S.LanguageItem
          key={idx}
          onClick={() => onLanguageClick(languageMap[lang], selected.includes(languageMap[lang]))}
          selected={selected.includes(languageMap[lang])}
        >
          {lang}
        </S.LanguageItem>
      ))}
    </S.LanguageList>
  );
};

export default LanguageFilter;
