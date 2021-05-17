import React, { useState } from "react";
import styles from "./postRegister.module.css";
import EditorContainer from "../../component/editor/editorContainer";
import WritebuttonContainer from "../../component/writeButton/writebuttonContainer";

const handleSubmit = () => {};

const PostRegister = (props) => {
  return (
    <section className={styles.editorWrapper}>
      <EditorContainer></EditorContainer>
      <WritebuttonContainer></WritebuttonContainer>
    </section>
  );
};
export default PostRegister;
