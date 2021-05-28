import React, { useEffect, useState } from "react";
import studyService from "../../../service/study_service";
import styles from "./postModal.module.css";

const PostModal = ({ study, handleClose }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    const res = studyService.getDetail(study._id).then((response) => {
      console.log("response!!!", response.data.content);
      setContent((state) => response.data.content);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default PostModal;
