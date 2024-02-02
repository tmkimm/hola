import React from 'react';
import * as S from './styled';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { HolaLogEvent } from 'common/GA';

const RecommendEventsMobile = ({ recommendEvents }) => {
  const history = useHistory();

  return (
    <S.Box>
      <S.Title>🗓️ Hola-IT 추천 이벤트</S.Title>
      <S.List>
        {recommendEvents.map((event) => {
          const { title, views, _id, badge } = event;

          return (
            <Link
              key={title}
              to={`/hola-it/${_id}`}
              onClick={(e) => {
                e.preventDefault();
                //TODO: GA 이벤트 정의
                //HolaLogEvent('select_trending', { category: id });
                history.push(`/hola-it/${_id}`);
              }}
            >
              <S.Container key={title}>
                <S.Deadline>{`🚨 ${badge[0]?.name}`}</S.Deadline>
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

export default RecommendEventsMobile;
