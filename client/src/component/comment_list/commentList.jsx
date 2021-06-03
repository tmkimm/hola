import React from "react";
import CommentItem from "../comment_item/commentItem";
import styles from "./commentList.module.css";

const CommentList = ({ CommentList, setIsComplete, isComplete }) => (
  <ul className={styles.CommentList}>
    {CommentList.map((comment) => (
      <CommentItem comment={comment} key={comment._id} setIsComplete={setIsComplete} isComplete={isComplete}></CommentItem>
    ))}
  </ul>
);

export default CommentList;
