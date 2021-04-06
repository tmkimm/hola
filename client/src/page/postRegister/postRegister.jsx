import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "../../component/editor/editor";

const handleSubmit = () => {};

const PostRegister = (props) => {
  const [value, setValue] = useState("");

  return (
    <>
      <Editor></Editor>
    </>
  );
};
export default PostRegister;
