import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { modifyPost, writePost } from "../../store/write";
import Writebutton from "./writebutton";
import { toast } from "react-toastify";

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
  const user = useSelector((state) => state.user);
  const { title, content, language, post, postError, postId } = useSelector(
    ({ write }) => ({
      title: write.title,
      content: write.content,
      language: write.language,
      post: write.post,
      postError: write.postError,
      postId: write.postId,
    })
  );

  // language 자동으로 넘어가도록 수정
  const onPublish = () => {
    if (postId)
      dispatch(modifyPost({ postId, title, content, language })).then(
        (response) => {
          console.log("response is ", response);
          toast.info("글 수정이 완료되었습니다.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      );
    else {
      dispatch(writePost({ title, content, language })).then((response) => {
        console.log("response is ", response);
        toast.success("글 작성이 완료되었습니다.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
    }
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      history.push(`/`);
    }

    if (postError) {
      console.log(post.Error);
    }
  }, [history, post, postError]);

  return <Writebutton onPublish={onPublish} onCancel={onCancel}></Writebutton>;
};

export default WritebuttonContainer;
