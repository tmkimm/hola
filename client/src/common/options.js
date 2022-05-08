const languageMap = {
  Udemy: 'udemy',
  JavaScript: 'javaScript',
  TypeScript: 'typeScript',
  React: 'react',
  Vue: 'vue',
  Svelte: 'svelte',
  Nextjs: 'nextjs',
  Nodejs: 'nodejs',
  Java: 'java',
  Spring: 'spring',
  Go: 'go',
  Nestjs: 'nestjs',
  Kotlin: 'kotlin',
  Express: 'express',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Python: 'python',
  Django: 'django',
  php: 'php',
  GraphQL: 'graphql',
  Firebase: 'firebase',
  Flutter: 'flutter',
  Swift: 'swift',
  ReactNative: 'reactnative',
  Unity: 'unity',
  AWS: 'aws',
  Kubernetes: 'kubernetes',
  Docker: 'docker',
  Zeplin: 'zeplin',
  Jest: 'jest',
};

const languageList = [
  { value: 'udemy', label: 'Udemy' },
  { value: 'javaScript', label: 'JavaScript' },
  { value: 'typeScript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'nodejs', label: 'Nodejs' },
  { value: 'spring', label: 'Spring' },
  { value: 'java', label: 'Java' },
  { value: 'nextjs', label: 'Nextjs' },
  { value: 'nestjs', label: 'Nestjs' },
  { value: 'express', label: 'Express' },
  { value: 'go', label: 'Go' },
  { value: 'c', label: 'C' },
  { value: 'python', label: 'Python' },
  { value: 'django', label: 'Django' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'php', label: 'php' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'reactnative', label: 'ReactNative' },
  { value: 'unity', label: 'Unity' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'aws', label: 'AWS' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'docker', label: 'Docker' },
  { value: 'git', label: 'Git' },
  { value: 'figma', label: 'Figma' },
  { value: 'zeplin', label: 'Zeplin' },
];

const studyOrProjectOption = [
  { value: '1', label: '프로젝트' },
  { value: '2', label: '스터디' },
];

const onlineOrOfflineOption = [
  { value: 'on', label: '온라인' },
  { value: 'off', label: '오프라인' },
];

const recruitsOption = [
  { value: 'und', label: '인원 미정' },
  { value: '1', label: '1명' },
  { value: '2', label: '2명' },
  { value: '3', label: '3명' },
  { value: '4', label: '4명' },
  { value: '5', label: '5명' },
  { value: '6', label: '6명' },
  { value: '7', label: '7명' },
  { value: '8', label: '8명' },
  { value: '9', label: '9명' },
  { value: 'mo', label: '10명 이상' },
];

const contactTypeOption = [
  { value: 'ok', label: '카카오톡 오픈채팅' },
  { value: 'em', label: '이메일' },
  { value: 'gf', label: '구글 폼' },
];

const expectedPeriodOption = [
  { value: 'und', label: '기간 미정' },
  { value: '1', label: '1개월' },
  { value: '2', label: '2개월' },
  { value: '3', label: '3개월' },
  { value: '4', label: '4개월' },
  { value: '5', label: '5개월' },
  { value: '6', label: '6개월' },
  { value: 'lt', label: '장기' },
];

export {
  languageList,
  studyOrProjectOption,
  onlineOrOfflineOption,
  recruitsOption,
  contactTypeOption,
  expectedPeriodOption,
  languageMap,
};
