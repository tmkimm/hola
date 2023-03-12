import React from 'react';
import EmptyList from 'component/empty_list/emptyList';
import StudyList from 'component/study_list/studyList';
import { useStudySearch } from './hooks/useStudySearch';
import Pagination from '@mui/material/Pagination';
import styles from './posts.module.css';
import { useDispatch } from 'react-redux';
import { changeField } from '../../store/language';

const PostTemp = () => {
  const { data, status, isLoading, page } = useStudySearch();
  const dispatch = useDispatch();
  if (isLoading || !data) return null;

  const handlePage = (event) => {
    const currentPage = parseInt(event.target.outerText);
    dispatch(changeField({ key: 'previousPage', value: page }));
    dispatch(changeField({ key: 'page', value: currentPage }));
  };

  const {
    data: { posts, lastPage },
  } = data;

  return (
    <>
      {status === 'success' && posts.length !== 0 ? (
        <StudyList studyList={posts}></StudyList>
      ) : (
        <EmptyList />
      )}
      <div className={styles.paginationWrapper}>
        <Pagination count={lastPage} page={page} onChange={handlePage} color='primary' />
      </div>
    </>
  );
};

export default PostTemp;
