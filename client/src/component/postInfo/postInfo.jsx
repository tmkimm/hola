import React, { useState, useCallback } from 'react';
import { Datepicker } from 'component/datepicker';
import { Input } from 'component/input';
import styles from './postinfo.module.css';
import { Selectbox } from 'component/select';
import {
  studyOrProjectOption,
  onlineOrOfflineOption,
  languageList,
  recruitsOption,
  contactTypeOption,
  expectedPeriodOption,
} from 'common/options';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from 'store/write';

export const PostInfo = () => {
  const dispatch = useDispatch();
  const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch]);
  const handleInputChange = useCallback(
    (e) => {
      onChangeField({ key: 'contactPoint', value: e.target.value });
    },
    [onChangeField],
  );
  const handleDateChange = useCallback(
    (date) => {
      onChangeField({ key: 'startDate', value: date });
    },
    [onChangeField],
  );

  const {
    language,
    startDate,
    type,
    recruits,
    onlineOrOffline,
    contactType,
    contactPoint,
    expectedPeriod,
  } = useSelector(({ write }) => ({
    language: write.language,
    startDate: write.startDate,
    type: write.type,
    recruits: write.recruits,
    onlineOrOffline: write.onlineOrOffline,
    contactType: write.contactType,
    contactPoint: write.contactPoint,
    expectedPeriod: write.expectedPeriod,
  }));

  const customStyles = {
    width: '100%',
    minHeight: '56px',
    height: '56px',
  };

  return (
    <>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Selectbox
            isMulti={false}
            labelText='모집 구분'
            customStyles={customStyles}
            options={studyOrProjectOption}
            selectValue={type}
            setSelectValue={onChangeField}
            placeholder='스터디/프로젝트'
            id='type'
          />
        </li>
        <li className={styles.listItem}>
          <Selectbox
            isMulti={false}
            labelText='모집 인원'
            customStyles={customStyles}
            options={recruitsOption}
            selectValue={recruits}
            setSelectValue={onChangeField}
            placeholder='인원 미정~10명 이상'
            id='recruits'
          />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Selectbox
            isMulti={false}
            labelText='진행 방식'
            customStyles={customStyles}
            options={onlineOrOfflineOption}
            selectValue={onlineOrOffline}
            setSelectValue={onChangeField}
            placeholder='온라인/오프라인'
            id='onlineOrOffline'
          />
        </li>
        <li className={styles.listItem}>
          <Selectbox
            isMulti={false}
            labelText='진행 기간'
            customStyles={customStyles}
            options={expectedPeriodOption}
            selectValue={expectedPeriod}
            setSelectValue={onChangeField}
            placeholder='기간 미정~6개월 이상'
            id='expectedPeriod'
          />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Selectbox
            isMulti={true}
            labelText='기술 스택'
            customStyles={customStyles}
            options={languageList}
            selectValue={language}
            setSelectValue={onChangeField}
            placeholder='프로젝트 사용 스택'
            id='language'
          />
        </li>
        <li className={styles.listItem}>
          <Datepicker dateValue={startDate} setDateValue={handleDateChange} />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Selectbox
            isMulti={false}
            labelText='연락 방법'
            customStyles={customStyles}
            options={contactTypeOption}
            selectValue={contactType}
            setSelectValue={onChangeField}
            placeholder='카카오톡/이메일'
            id='contactType'
          />
        </li>
        <li className={styles.listItem}>
          <Input
            labelText='연락처'
            placeholder='오픈 카톡방 링크/이메일 아이디'
            value={contactPoint}
            onChange={handleInputChange}
          />
        </li>
      </ul>
    </>
  );
};
