import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from 'component/loading/loadingSpinner';
import Modal from 'component/modal/modal_component/modal';
import StudyContent from 'component/study_content/studyContent';
import { clearPost, readPost } from 'store/read';

const Study = () => {
  const location = useLocation();
  const studyId = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const read = useSelector((state) => state.read);

  useEffect(() => {
    dispatch(readPost(studyId));
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, studyId]);

  return (
    <>
      {read.loading === 'idle' ? (
        <Modal visible={true} name='loading'>
          <LoadingSpinner />
        </Modal>
      ) : (
        <StudyContent id={studyId} />
      )}
    </>
  );
};

export default Study;
