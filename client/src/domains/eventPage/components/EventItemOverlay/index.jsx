import React, { useState } from 'react';
import * as S from './styled';
import { getFormattedDate } from 'domains/eventPage/utils/getFormattedDate';
import { useAddEventLikes } from 'domains/eventPage/hooks/useAddEventLikes';
import { useDeleteEventLikes } from 'domains/eventPage/hooks/useDeleteEventLikes';
import { toast } from 'react-toastify';
import { useLoginModal } from 'hooks/useModal';
import { useSelector } from 'react-redux';

const EventItemOverlay = ({ eventInfo }) => {
  const { startDate, _id, isLiked } = eventInfo;
  const { mutate: addLikes } = useAddEventLikes();
  const { mutate: deleteLikes } = useDeleteEventLikes();
  const [liked, setLiked] = useState(isLiked ?? false);
  const mutateFn = liked ? deleteLikes : addLikes;
  //FIXME: modal 상태를 전역으로 관리하고 있어서, openModal만 해주면 됨.
  // side effect를 발생시키는 코드라 수정 필요
  const { openModal } = useLoginModal();
  const { id: userId } = useSelector((state) => state.user);

  return (
    <>
      <S.Overlay className='overlay'>
        <S.DetailInfo>
          <S.DetailInfoDecription>일시</S.DetailInfoDecription>
          <S.DetailInfoDecription>{`${getFormattedDate(startDate)}`}</S.DetailInfoDecription>
        </S.DetailInfo>
        <S.DetailInfo>
          <S.DetailInfoDecription>장소</S.DetailInfoDecription>
          <S.DetailInfoDecription>카카오판교아지트</S.DetailInfoDecription>
        </S.DetailInfo>
        <S.LikeContainer
          onClick={(e) => {
            e.stopPropagation();

            if (userId === undefined) {
              openModal();
              return;
            }
            const toastText = liked ? '관심 목록에서 제거했어요!' : '관심 목록에 추가했어요!';
            setLiked((prev) => !prev);

            mutateFn(_id, {
              onSuccess: () => {
                toast.success(toastText, {
                  position: 'top-right',
                  autoClose: 3000,
                });
              },
              onError: () => {
                setLiked((prev) => !prev);
                toast.error('잠시 후 다시 시도해주세요', {
                  position: 'top-right',
                  autoClose: 3000,
                });
              },
            });
          }}
        >
          <S.LikesImg
            src={liked ? '/images/info/bookmark_filled.svg' : '/images/info/bookmark.svg'}
          />
        </S.LikeContainer>
      </S.Overlay>
    </>
  );
};

export default EventItemOverlay;
