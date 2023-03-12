import React, { useEffect } from 'react';
import EmptyList from 'component/empty_list/emptyList';
import StudyList from 'component/study_list/studyList';
import { useStudySearch } from './hooks/useStudySearch';
import Pagination from '@mui/material/Pagination';
import styles from './posts.module.css';
import { useDispatch } from 'react-redux';
import { changeField } from '../../store/language';
import { isMobile } from 'react-device-detect';

const Posts = () => {
  const { data, status, isLoading, page } = useStudySearch();
  const dispatch = useDispatch();

  useEffect(() => {
    const scrollPosition = isMobile ? 400 : 800;
    window.scrollTo(0, scrollPosition);
  }, [page]);

  if (isLoading || !data) return null;

  const handlePage = (event) => {
    const currentPage = parseInt(event.target.outerText);
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
        <Pagination
          count={lastPage}
          page={page}
          onChange={handlePage}
          color='primary'
          showFirstButton
          showLastButton
          size={isMobile ? 'small' : 'medium'}
          sx={{
            '& .Mui-selected, & .Mui-selected:hover': {
              backgroundColor: '#FFE579!important',
              color: '#333333!important',
            },
            '& button:hover': { backgroundColor: '#F1F1F1' },
          }}
        />
      </div>
    </>
  );
};

export default Posts;
