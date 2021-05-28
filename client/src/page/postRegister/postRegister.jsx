import React from "react";
import styles from "./postRegister.module.css";
import EditorContainer from "../../component/editor/editorContainer";
import WritebuttonContainer from "../../component/writeButton/writebuttonContainer";
import Navbar from "../../component/nav_bar/navbar";

const PostRegister = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <section className={styles.editorWrapper}>
        <EditorContainer></EditorContainer>
        <WritebuttonContainer></WritebuttonContainer>
      </section>
    </>
  );
};
export default PostRegister;
