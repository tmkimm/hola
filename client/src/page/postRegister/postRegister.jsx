import React, { useState } from "react";
import styles from "./postRegister.module.css";
import Editor from "../../component/editor/editor";
import Writebutton from "../../component/writeButton/writebutton";

const handleSubmit = () => {};

const PostRegister = (props) => {
  const [value, setValue] = useState("");

  return (
    <section className={styles.editorWrapper}>
      <Editor></Editor>
      <Writebutton></Writebutton>
    </section>
  );
};
export default PostRegister;
