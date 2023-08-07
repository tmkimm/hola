import React from 'react';
import * as S from './styled';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { HolaLogEvent } from 'common/GA';

const TrendingMobile = ({ isLoading, trendings }) => {
  const history = useHistory();

  if (isLoading) return <S.Skeleton />;

  return (
    <S.Box>
      <S.Title>🔥 이번주 올라 인기글</S.Title>
      <S.List>
        {trendings.map((trending) => {
          const { title, views, id, badge } = trending;

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
                <S.Deadline>{`🚨 ${badge[0].name}`}</S.Deadline>
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
