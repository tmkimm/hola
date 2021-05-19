import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { writePost } from "../../store/write";
import Writebutton from "./writebutton";

/* 

Writebutton을 감싸고 있는 component입니다.

post 등록이 성공하면 main page로 이동하고,
실패하면 error를 보여줍니다.

To-do
-> modal 보여지도록 글 id return 받기
-> 실패했을때 에러 띄워주기

*/
const WritebuttonContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { title, content, language, post, postError } = useSelector(
    ({ write }) => ({
      title: write.title,
      content: write.content,
      language: write.language,
      post: write.post,
      postError: write.postError,
    })
  );

  // language 자동으로 넘어가도록 수정
  const onPublish = () => {
    dispatch(
      writePost({ title, content, language: ["Typescript", "typescript"] })
    ).then((response) => {
      console.log("response is ", response);
    });
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      history.push("/");
    }

    if (postError) {
      console.log(post.Error);
    }
  }, [history, post, postError]);

  return <Writebutton onPublish={onPublish} onCancel={onCancel}></Writebutton>;
};

export default WritebuttonContainer;
