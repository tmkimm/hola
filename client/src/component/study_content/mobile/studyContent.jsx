import React from 'react';
import * as S from './styled';
import { useSelector } from 'react-redux';
import { formatDate } from 'common/utils';
import { StudyInfo } from 'component/studyInfo';
import LikesAndViews from 'component/likes_and_views/likesAndViews';
import CommentContainer from 'component/comment_container/commentContainer';
import { toast } from 'react-toastify';
import useSocialShare from 'hooks/useSocialShare';
import { HolaLogEvent } from 'common/GA';

const MobileStudyContent = ({ id }) => {
  const { post } = useSelector((state) => state.read);
  const { shareToKakaoTalk } = useSocialShare();
  const {
    imagePath,
    nickname,
    createdAt,
    content,
    contactPoint,
    contactType,
    id: studyId,
    title,
  } = post;
  const defaultPath = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/';

  const handleShareClick = () => {
    shareToKakaoTalk({
      templateId: 93996,
      templateArgs: {
        studyId,
        title,
        description: content,
      },
    });
  };

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('클립보드에 주소가 복사되었어요!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      toast.error('복사에 실패했어요! 잠시후 다시 시도해보세요.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleApplyClick = () => {
    const { value } = contactType;

    if (value === 'ok' || value === 'gf') window.open(contactPoint, '_blank');
    else copyContent(contactPoint);
  };

  const handleLikesClick = () => {
    HolaLogEvent('highfive_block', { category: studyId });
  };

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
          userId={null}
        ></LikesAndViews>

        <CommentContainer id={post.id}></CommentContainer>
      </S.BottomSection>

      <S.ApplyContainer>
        <S.ApplyButton onClick={handleApplyClick}>바로지원</S.ApplyButton>
        <S.ShareButton onClick={handleShareClick}>공유하기</S.ShareButton>

        <S.LikeContainer onClick={handleLikesClick}>
          <S.LikesImg
            src={false ? '/images/info/bookmark_filled.svg' : '/images/info/bookmark.svg'}
          />
        </S.LikeContainer>
      </S.ApplyContainer>
    </S.Container>
  );
};

export default MobileStudyContent;
