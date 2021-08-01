import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../component/loading/loadingSpinner";
import Modal from "../../component/modal/modal_component/modal";
import Navbar from "../../component/nav_bar/navbar";
import StudyContent from "../../component/study_content/studyContent";
import { clearPost, readPost } from "../../store/read";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Study = () => {
  const query = useQuery();
  const studyId = query.get("id");
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
      <Navbar showRegisterButton={true}></Navbar>
      {read.loading === "idle" ? (
        <Modal visible={true} name="loading">
          <LoadingSpinner />
        </Modal>
      ) : (
        <StudyContent id={studyId} />
      )}
    </>
  );
};

export default Study;
