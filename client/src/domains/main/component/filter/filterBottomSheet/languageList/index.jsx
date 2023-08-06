import React from 'react';
import * as S from './styled';

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

const Languagelist = () => {
  return (
    <S.LanguageList>
      {languages.map((lang) => (
        <S.LanguageItem>{lang}</S.LanguageItem>
      ))}
    </S.LanguageList>
  );
};

export default Languagelist;
