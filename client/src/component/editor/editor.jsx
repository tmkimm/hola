import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import studyService from "../../service/study_service";
import Quill from "quill";
import styles from "./editor.module.css";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import LikeLanguages from "../like_languages/likeLanguages";

/* 

Quill을 이용한 editor component 입니다.
redux로 editor 상태를 관리하고,
user가 image upload시 s3 bucket으로 바로 upload 합니다.

To-do
styled-component 제거 
-> quill 내부 style sheet 적용하려면 css file을 import 해야해서 일단 보류

png 파일 외에 gif나 jpeg도 test
image minify 적용할건지 결정 필요
image upload시 파일 크기 작은거 확인 필요 <- 해결 됨

*/

const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    padding: 0;
    min-height: 480px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

const Editor = ({
  title,
  content,
  language,
  onChangeField,
  onChangeLanguage,
}) => {
  const quillElement = useRef(""); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(""); // Quill 인스턴스를 설정
  const user = useSelector((state) => state.user);

  /* image Handler 함수 */
  const imageHandler = useCallback(
    async (dataUrl, type, imageData) => {
      const quill = quillInstance.current;
      const { preSignedUrl, fileName } = await studyService.getPresignedUrl(
        user.nickName
      );

      const imageFile = imageData.toFile(fileName);
      const imageUrl = `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${fileName}`;

      /* bucket image upload */
      await studyService.uploadImageToS3(preSignedUrl, imageFile);
      let index = (quill.getSelection() || {}).index;
      if (index === undefined || index < 0) index = quill.getLength();
      quill.insertEmbed(index, "image", imageUrl, "user");
      quill.setSelection(quill.getSelection().index + 1, 0); // image upload 후 cursor 이동
    },
    [user.nickName]
  );

  /* default quill editor 설정 */
  useEffect(() => {
    Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
    quillInstance.current = new Quill(quillElement.current, {
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
        imageDropAndPaste: {
          handler: imageHandler,
        },
      },
      placeholder: "내용을 입력하세요...",
      readOnly: false,
      theme: "snow",
    });

    /* 기본 image upload button에 대해서도 같은 handler 적용 */
    const ImageData = QuillImageDropAndPaste.ImageData;
    quillInstance.current
      .getModule("toolbar")
      .addHandler("image", (clicked) => {
        if (clicked) {
          let fileInput = quillInstance.current.container.querySelector(
            "input.ql-image[type=file]"
          );
          if (fileInput == null) {
            fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute(
              "accept",
              "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
            );
            fileInput.classList.add("ql-image");
            fileInput.addEventListener("change", (e) => {
              let files = e.target.files,
                file;
              if (files.length > 0) {
                file = files[0];
                let type = file.type;
                let reader = new FileReader();
                reader.onload = (e) => {
                  // handle the inserted image
                  let dataUrl = e.target.result;
                  imageHandler(dataUrl, type, new ImageData(dataUrl, type));
                  fileInput.value = "";
                };
                reader.readAsDataURL(file);
              }
            });
          }
          fileInput.click();
        }
      });

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "content", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField, imageHandler]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = content;
  }, [content]);

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };

  return (
    <section className={styles.editorWrapper}>
      <input
        className={styles.titleInput}
        type="text"
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <div className={styles.languageWrapper}>
        <h3 className={styles.languageList}>사용 언어 : </h3>
        <LikeLanguages
          likeLanguages={language}
          setLikeLanguages={onChangeLanguage}
          placeholder={"프로젝트/스터디 진행 언어 선택"}
        ></LikeLanguages>
      </div>
      <QuillWrapper>
        <div className={styles.quillEditor} ref={quillElement} />
      </QuillWrapper>
    </section>
  );
};
export default Editor;
