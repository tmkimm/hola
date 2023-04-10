import React from 'react';
import * as S from './styled';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'component/common/avatar';
import { formatDate } from 'common/utils';
import { StudyInfo } from 'component/studyInfo';

const MobileStudyContent = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.read);
  const { imagePath, nickname, createdAt } = post;
  const defaultPath = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/';

  const { title } = post;

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {/* 유저 및 시간 정보 */}
      <S.UserInfo>
        <S.UserContainer>
          <S.UserImg src={defaultPath + imagePath} />
          <S.UserName>{nickname}</S.UserName>
        </S.UserContainer>
        <S.StudyDate>{formatDate(createdAt)}</S.StudyDate>
      </S.UserInfo>
      {/* 스터디 모집 정보 */}
      <StudyInfo />
    </S.Container>
  );
};

export default MobileStudyContent;
