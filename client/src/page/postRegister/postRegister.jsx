import React from "react";
import styles from "./postRegister.module.css";
import EditorContainer from "../../component/editor/editorContainer";
import WritebuttonContainer from "../../component/write_button/writebuttonContainer";
import Navbar from "../../component/nav_bar/navbar";

const PostRegister = () => {
  return (
    <>
      <Navbar showRegisterButton={false}></Navbar>
      <section className={styles.editorWrapper}>
        <EditorContainer></EditorContainer>
        <WritebuttonContainer></WritebuttonContainer>
      </section>
    </>
  );
};
export default PostRegister;
