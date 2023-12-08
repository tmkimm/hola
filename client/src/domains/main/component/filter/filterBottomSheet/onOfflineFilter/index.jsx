import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './styled';
import { changeField } from 'store/language';
import { HolaLogEvent } from 'common/GA';

const onlineOrOfflineOption = [
  { value: 'ALL', label: '전체' },
  { value: 'on', label: '온라인' },
  { value: 'off', label: '오프라인' },
  { value: 'onOff', label: '온/오프라인' },
];

const OnOfflineFilter = () => {
  const dispatch = useDispatch();
  const onOffline = useSelector((state) => state.language.onOffLine);

  return (
    <S.LanguageList>
      {onlineOrOfflineOption.map((types, idx) => (
        <S.LanguageItem
          key={idx}
          selected={onOffline === types.value}
          onClick={() => {
            HolaLogEvent(`mobile_filter_method`, { category: types.value });
            dispatch(changeField({ key: 'onOffLine', value: types.value }));
          }}
        >
          {types.label}
        </S.LanguageItem>
      ))}
    </S.LanguageList>
  );
};

export default OnOfflineFilter;
