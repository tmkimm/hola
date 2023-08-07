export const textareaPlaceHolderMaker = ({ workExperience, position, nickName }) => {
  if (workExperience === '' || position === '') return 'Hola! 만나서 반가워요!';

  let positionSuffix = '';
  if (
    position === '프론트엔드' ||
    position === '백엔드' ||
    position === '안드로이드' ||
    position === 'IOS'
  )
    positionSuffix = '개발자';

  return `안녕하세요. ${workExperience}차 ${position} ${positionSuffix} ${nickName}입니다.`;
};
