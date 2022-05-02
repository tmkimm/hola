import React, { useState } from 'react';
import { Datepicker } from 'component/datepicker';
import { Input } from 'component/input';
import Select from 'react-select';
import styles from './postinfo.module.css';
import { Selectbox } from 'component/select';
import {
  studyOrProjectOption,
  onlineOrOfflineOption,
  membersOption,
  contactMethodOption,
  periodsOption,
  languageList,
} from 'common/options';

export const PostInfo = () => {
  const [onlineOrOffline, setOnlineOrOffline] = useState('online');
  const [members, setMembers] = useState(0);
  const [periods, setPeriods] = useState(0);
  const [studyOrProject, setStudyOrProject] = useState('study');
  const [contactMethod, setContactMethod] = useState('kakaotalk');
  const [techStack, setTechStack] = useState('');
  const [startDate, setStartDate] = useState(null);

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
            labelText='모집 구분'
            customStyles={customStyles}
            options={studyOrProjectOption}
            selectValue={studyOrProject}
            setSelectValue={setStudyOrProject}
            placeholder='스터디/프로젝트'
          />
        </li>
        <li className={styles.listItem}>
          <Selectbox
            labelText='모집 인원'
            customStyles={customStyles}
            options={membersOption}
            selectValue={members}
            setSelectValue={setMembers}
            placeholder='인원 미정~10명 이상'
          />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Selectbox
            labelText='진행 방식'
            customStyles={customStyles}
            options={onlineOrOfflineOption}
            selectValue={onlineOrOffline}
            setSelectValue={setOnlineOrOffline}
            placeholder='온라인/오프라인'
          />
        </li>
        <li className={styles.listItem}>
          <Selectbox
            labelText='진행 기간'
            customStyles={customStyles}
            options={periodsOption}
            selectValue={periods}
            setSelectValue={setPeriods}
            placeholder='기간 미정~6개월 이상'
          />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Selectbox
            labelText='기술 스택'
            customStyles={customStyles}
            options={languageList}
            selectValue={techStack}
            setSelectValue={setTechStack}
            placeholder='프로젝트 사용 스택'
          />
        </li>
        <li className={styles.listItem}>
          <Datepicker dateValue={startDate} setDateValue={setStartDate} />
        </li>
      </ul>
      <ul className={styles.inputList}>
        <li className={styles.listItem}>
          <Selectbox
            labelText='연락 방법'
            customStyles={customStyles}
            options={contactMethodOption}
            selectValue={contactMethod}
            setSelectValue={setContactMethod}
            placeholder='카카오톡/이메일'
          />
        </li>
        <li className={styles.listItem}>
          <Input labelText='연락처' placeholder='오픈 카톡방 링크/이메일 아이디' />
        </li>
      </ul>
    </>
  );
};
