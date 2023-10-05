import React from 'react';
import * as S from './styled';
import { onlineOrOfflineOption, positionsOption } from 'common/options';
import CommonSelect from '../../select/select';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, changePostMode } from 'store/language';
import LanguageSelect from '../../listbox';
import Search from '../../search/search';
import StudyOrProject from '../../studyOrProject';
import { useLoginModal } from 'hooks/useModal';

const DesktopFilter = () => {
  const dispatch = useDispatch();
  const { isClosed, isLiked, mode } = useSelector((state) => state.language);
  const user = useSelector((state) => state.user);
  const { openModal } = useLoginModal();

  return (
    <S.CategoryContainer>
      <StudyOrProject category={mode} />
      <S.Container>
        <S.SelectContainer>
          <LanguageSelect />
          <CommonSelect
            options={positionsOption}
            placeholder='포지션'
            onChange={(e) => {
              const { value } = e;
              dispatch(changeField({ key: 'position', value }));
            }}
          />
          <CommonSelect
            options={onlineOrOfflineOption}
            placeholder='진행 방식'
            onChange={(e) => {
              const { value } = e;
              dispatch(changeField({ key: 'onOffLine', value }));
            }}
          />
          <S.SelectItem
            selected={isLiked}
            onClick={() => {
              user.id ? dispatch(changePostMode(!isLiked)) : openModal();
            }}
          >
            👋 내 북마크 보기
          </S.SelectItem>
          <S.SelectItem
            selected={!isClosed}
            onClick={() => {
              dispatch(changeField({ key: 'isClosed', value: !isClosed }));
            }}
          >
            👀 모집 중만 보기
          </S.SelectItem>
        </S.SelectContainer>
        <Search />
      </S.Container>
    </S.CategoryContainer>
  );
};

export default DesktopFilter;
