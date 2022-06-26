import React, { useRef } from 'react';
import EmptyList from 'component/empty_list/emptyList';
import StudyList from 'component/study_list/studyList';
import { useStudyInfiniteSearch } from './hooks/useStudyInfiniteSearch';
import { useBottomObserver } from './hooks/useBottomObserver';
import styles from './posts.module.css';

export const Posts = ({ checked, category }) => {
  const { data, hasNextPage, fetchNextPage, status, isFetching } = useStudyInfiniteSearch(
    category,
    checked,
  );

  const makeStudyLists = () =>
    data.pages.map((study) => study.result).reduce((acc, cur) => [...acc, ...cur]);

  const bottomObserver = useRef(null);
  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useBottomObserver({
    target: bottomObserver,
    onIntersect,
    hasNextPage,
    isFetching,
  });

  return (
    <>
      {status === 'success' && data.pages[0]?.result.length !== 0 ? (
        <StudyList studyList={makeStudyLists()}></StudyList>
      ) : (
        <EmptyList />
      )}
      <div className={styles.bottomObserver} ref={bottomObserver} />
    </>
  );
};
