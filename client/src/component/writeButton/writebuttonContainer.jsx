import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { postRegister } from "../../store/write";
import Writebutton from "./writebutton";
const WritebuttonContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
  }));

  const onPublish = () => {
    dispatch(postRegister({ title, body, tags: ["typescript"] }));
  };

  const onCancel = () => {
    history.goBack();
  };
  return <Writebutton onPublish={onPublish} onCancel={onCancel}></Writebutton>;
};

export default WritebuttonContainer;
