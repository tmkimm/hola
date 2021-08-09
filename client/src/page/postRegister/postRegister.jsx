import React, { useEffect } from "react";
import styles from "./postRegister.module.css";
import EditorContainer from "../../component/editor/editorContainer";
import WritebuttonContainer from "../../component/write_button/writebuttonContainer";
import Navbar from "../../component/nav_bar/navbar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const PostRegister = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user.id === undefined) {
      toast.error("로그인이 필요한 페이지입니다.", {
        position: "top-right",
        autoClose: 3000,
      });
      history.push("/");
    }
  }, [history, user.id, user.nickName]);
  return (
    <>
      <Navbar />
      <section className={styles.editorWrapper}>
        <EditorContainer></EditorContainer>
        <WritebuttonContainer></WritebuttonContainer>
      </section>
    </>
  );
};
export default PostRegister;
