import React from 'react';
import * as S from './styled';
import { languageList, onlineOrOfflineOption, positionsOption } from 'common/options';
import CommonSelect from '../../select/select';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from 'store/language';

const DesktopFilter = () => {
  const dispatch = useDispatch();
  const { isClosed } = useSelector((state) => state.language);
  console.log('isCLosed: ', isClosed);
  return (
    <S.SelectConatiner>
      <CommonSelect
        options={languageList}
        placeholder='기술 스택'
        onChange={(e) => {
          const { value } = e;
          // handleField({ key: 'selected', value });
        }}
      />
      <CommonSelect
        options={positionsOption}
        placeholder='포지션'
        onChange={(e) => {
          const { value } = e;
          dispatch(changeField({ key: 'position', value }));
        }}
      />
      <CommonSelect options={onlineOrOfflineOption} placeholder='진행 방식' />
      <S.SelectItem>👋 내 북마크 보기</S.SelectItem>
      <S.SelectItem
        isSelected={!isClosed}
        onClick={() => {
          dispatch(changeField({ key: 'isClosed', value: !isClosed }));
        }}
      >
        👀 모집 중만 보기
      </S.SelectItem>
    </S.SelectConatiner>
  );
};

export default DesktopFilter;
