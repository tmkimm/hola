import React, { useCallback, useRef } from 'react';
import EmptyList from 'component/empty_list/emptyList';
import StudyList from 'component/study_list/studyList';
import useStudySearch from '../hooks/useStudySearch';

export const Projects = ({ checked, category, pageNumber, setPageNumber }) => {
  const observer = useRef();

  const { studyList, hasMore, loading } = useStudySearch(
    category,
    pageNumber,
    setPageNumber,
    checked,
  );

  const lastStudyElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <>
      {!loading && studyList.length === 0 ? (
        <EmptyList />
      ) : (
        <StudyList lastStudyElementRef={lastStudyElementRef} studyList={studyList}></StudyList>
      )}
    </>
  );
};
