import React, { useEffect, useState } from "react";
import CommentInput from "../comment_input/commentInput";
import CommentList from "../comment_list/commentList";
import studyService from "../../service/study_service";

const CommentContainer = ({ id }) => {
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState("");
  const [isComplete, setIsComplete] = useState(false);  // useEffect 발생용 state
  
  // 댓글 등록 버튼
  const onRegisterClick = async (e) => {
    await studyService.registerComment({ id, content });
    setContent("");
    setIsComplete(isComplete => !isComplete);
  }
  
  useEffect(() => {
    studyService.getComments(id).then((response) => {
      console.log(`comment useeffect!!!`);
      setCommentList(response.data.comments);
    });
  }, [isComplete]);

  return (
    <>
      <CommentInput 
        content={content}
        setContent={setContent} 
        onRegisterClick={onRegisterClick}
        count={commentList.length}>
      </CommentInput>
      <CommentList
        CommentList={commentList}
        setIsComplete={setIsComplete}
        isComplete={isComplete}>
      </CommentList>
    </>
  )
};

export default CommentContainer;
