import React from 'react';
import * as S from './styled';
import CommonSelect from 'domains/main/component/select/select';
import { useDispatch, useSelector } from 'react-redux';
import { IT_FILTER, changeField } from 'store/itFilter';
import { filterSortOption, onlineOrOfflineOption } from 'common/options';

const filterList = {
  전체: IT_FILTER.TYPE.ALL,
  해커톤: IT_FILTER.TYPE.HACKATHON,
  컨퍼런스: IT_FILTER.TYPE.CONFERENCE,
  공모전: IT_FILTER.TYPE.CONTEST,
  부트캠프: IT_FILTER.TYPE.BOOTCAMP,
};

const DesktopItFilter = () => {
  const filterState = useSelector((state) => state.itFilter);
  const dispatch = useDispatch();

  return (
    <>
      <S.FilterList>
        {Object.keys(filterList).map((filterItem, idx) => {
          return (
            <S.FilterItem
              key={idx}
              $isSelected={filterList[filterItem] === filterState.eventType}
              onClick={() => {
                dispatch(changeField({ key: 'eventType', value: filterList[filterItem] }));
              }}
            >
              {filterItem}
            </S.FilterItem>
          );
        })}
      </S.FilterList>
      <S.SelectContainer>
        <CommonSelect
          options={filterSortOption}
          isDisabled={filterState.viewMode === IT_FILTER.VIEW.CALENDAR}
          placeholder='최신순'
          value={filterSortOption.filter((option) => {
            return option.value === filterState.sort;
          })}
          onChange={(e) => {
            const { value } = e;
            dispatch(changeField({ key: 'sort', value }));
          }}
        />
        <CommonSelect
          options={onlineOrOfflineOption}
          placeholder='진행방식'
          value={onlineOrOfflineOption.filter((option) => {
            return option.value === filterState.onOffline;
          })}
          onChange={(e) => {
            const { value } = e;
            dispatch(changeField({ key: 'onOffline', value }));
          }}
        />

        <S.SelectItem selected={false} onClick={() => {}}>
          👋 관심이벤트
        </S.SelectItem>
        <S.SelectItem
          selected={filterState.viewMode === 'calendar'}
          onClick={() => {
            dispatch(
              changeField({
                key: 'viewMode',
                value:
                  filterState.viewMode === IT_FILTER.VIEW.GENERAL
                    ? IT_FILTER.VIEW.CALENDAR
                    : IT_FILTER.VIEW.GENERAL,
              }),
            );
          }}
        >
          🗓️ 캘린더뷰
        </S.SelectItem>
      </S.SelectContainer>
    </>
  );
};

export default DesktopItFilter;
