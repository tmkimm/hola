import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, clearField } from "../../store/write";
import Editor from "./editor";

const EditorContainer = (props) => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );

  /* EditorContainer unmount시 quill editor 초기화 */
  useEffect(() => {
    return () => {
      dispatch(clearField());
    };
  }, [dispatch]);

  return (
    <Editor onChangeField={onChangeField} title={title} body={body}></Editor>
  );
};

export default EditorContainer;
