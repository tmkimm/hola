import React, { useState } from "react";
import styles from "./postRegister.module.css";
import Writebutton from "../../component/writeButton/writebutton";
import EditorContainer from "../../component/editor/editorContainer";

const handleSubmit = () => {};

const PostRegister = (props) => {
  const [value, setValue] = useState("");

  return (
    <section className={styles.editorWrapper}>
      <EditorContainer></EditorContainer>
      <Writebutton></Writebutton>
    </section>
  );
};
export default PostRegister;
