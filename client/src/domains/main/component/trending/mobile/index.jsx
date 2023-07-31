import React from 'react';
import * as S from './styled';
import differenceInDays from 'date-fns/differenceInDays';

const TrendingMobile = ({ trendings }) => {
  return (
    <S.Box>
      <S.Title>🔥 이번주 올라 인기글</S.Title>
      <S.List>
        {trendings.map((trending) => {
          const { title, startDate, views } = trending;
          const remainDay = differenceInDays(new Date(), new Date(startDate));
          return (
            <S.Container>
              <S.Deadline>
                {remainDay === 0 ? '🚨 오늘 마감' : `🚨 마감 ${remainDay}일전`}
              </S.Deadline>
              <S.ProjectTitle>{title}</S.ProjectTitle>
              <S.ViewCount>👀 조회수 {views}회</S.ViewCount>
            </S.Container>
          );
        })}
      </S.List>
    </S.Box>
  );
};

export default TrendingMobile;
