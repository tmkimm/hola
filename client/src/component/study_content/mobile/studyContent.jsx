import React from 'react';
import * as S from './styled';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from 'common/utils';
import { StudyInfo } from 'component/studyInfo';
import LikesAndViews from 'component/likes_and_views/likesAndViews';
import CommentContainer from 'component/comment_container/commentContainer';

const MobileStudyContent = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.read);
  const { imagePath, nickname, createdAt, content } = post;
  const defaultPath = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/';

  const { title } = post;

  return (
    <S.Container>
      <S.InfoSection>
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
        <S.InfoWrapper>
          <StudyInfo />
        </S.InfoWrapper>
      </S.InfoSection>
      <S.ProjectInfoContainer>
        <S.ProjectInfo>프로젝트 소개</S.ProjectInfo>
        <S.Content dangerouslySetInnerHTML={{ __html: content }} />
      </S.ProjectInfoContainer>

      <S.BottomSection>
        <LikesAndViews
          views={post.views}
          likeUser={post.likes}
          totalLikes={post.totalLikes}
          studyId={post.id}
          userId={id}
        ></LikesAndViews>

        <CommentContainer id={post.id}></CommentContainer>
      </S.BottomSection>

      <S.ApplyContainer>
        <S.ApplyButton>바로지원</S.ApplyButton>
        <S.ShareButton>공유하기</S.ShareButton>
        <S.LikesContainer>
          <S.LikesImg
            src={false ? '/images/info/bookmark_filled.png' : '/images/info/bookmark.png'}
          />
        </S.LikesContainer>
      </S.ApplyContainer>
    </S.Container>
  );
};

export default MobileStudyContent;
