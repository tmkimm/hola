import React from 'react';
import * as S from './styled';
import differenceInDays from 'date-fns/differenceInDays';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { HolaLogEvent } from 'common/GA';

const TrendingMobile = ({ isLoading, trendings }) => {
  const history = useHistory();

  if (isLoading)
    return (
      <S.Skeleton>
        <S.Title>🔥 이번주 올라 인기글</S.Title>
      </S.Skeleton>
    );

  return (
    <S.Box>
      <S.Title>🔥 이번주 올라 인기글</S.Title>
      <S.List>
        {trendings.map((trending) => {
          const { title, startDate, views, id } = trending;
          const remainDay = differenceInDays(new Date(startDate), new Date());
          return (
            <Link
              key={title}
              to={`/study/${id}`}
              onClick={(e) => {
                e.preventDefault();
                HolaLogEvent('select_trending', { category: id });
                history.push(`/study/${id}`);
              }}
            >
              <S.Container key={title}>
                <S.Deadline>
                  {remainDay === 0 ? '🚨 오늘 마감' : `🚨 마감 ${remainDay}일전`}
                </S.Deadline>
                <S.ProjectTitle>{title}</S.ProjectTitle>
                <S.ViewCount>👀 조회수 {views}회</S.ViewCount>
              </S.Container>
            </Link>
          );
        })}
      </S.List>
    </S.Box>
  );
};

export default TrendingMobile;
