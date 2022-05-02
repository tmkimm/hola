import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, changeLanguage, clearField } from 'store/write';
import Editor from './editor';

const EditorContainer = (props) => {
  const dispatch = useDispatch();
  const { title, content, language } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
    language: write.language,
  }));

  const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch]);
  const onChangeLanguage = useCallback((payload) => dispatch(changeLanguage(payload)), [dispatch]);

  /* EditorContainer unmount시 quill editor 초기화 */
  useEffect(() => {
    return () => {
      dispatch(clearField());
    };
  }, [dispatch]);

  return (
    <Editor
      onChangeField={onChangeField}
      onChangeLanguage={onChangeLanguage}
      title={title}
      content={content}
      language={language}
    ></Editor>
  );
};

export default EditorContainer;
