import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import Quill from "quill";
import styles from "./editor.module.css";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";

/* 

Quill을 이용한 editor 입니다.

To-do
styled-component 제거 
-> quill 내부 style sheet 적용하려면 css file을 import 해야해서 일단 보류

input 관리 redux 적용


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

const Editor = (props) => {
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정
  const [image, setImage] = useState({
    type: "", // image's mimeType
    dataUrl: null, // image's base64 string
    blob: null, // image's BLOB object
    file: null, // image's File object
  });

  const imageHandler = (dataUrl, type, imageData) => {
    imageData
      .minify({
        maxWidth: 320,
        maxHeight: 320,
        quality: 0.7,
      })
      .then((miniImageData) => {
        const blob = miniImageData.toBlob();
        const file = miniImageData.toFile("my_cool_image.png");

        console.log(`type: ${type}`);
        console.log(`dataUrl: ${dataUrl}`);
        console.log(`blob: ${blob}`);
        console.log(`file: ${file}`);

        setImage({ type, dataUrl, blob, file });
      });
    const quill = quillInstance.current;
    let index = (quill.getSelection() || {}).index;
    if (index === undefined || index < 0) index = quill.getLength();
    quill.insertEmbed(index, "image", "hihi", "user");
  };

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
      placeholder: "팀원을 모집해 보세요...",
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
  }, []);

  const quill = quillInstance.current;

  /*
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow", // snow or bubble
      placeholder: "내용을 작성하세요...",
      modules: {
        // 더 많은 옵션
        // https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });
    
    // quill에 text-change 이벤트 핸들러 등록
    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      /*
      if (source === "user") {
        onChangeField({ key: "body", value: quill.root.innerHTML });
      }
      
    });
  }, []);
//<div id="editor-container" style={{ height: "480px" }}></div>
  const onChangeTitle = (e) => {
    //onChangeField({ key: "title", value: e.target.value });
  };
*/

  return (
    <section className={styles.editorWrapper}>
      <input
        className={styles.titleInput}
        type="text"
        placeholder="제목을 입력하세요"
        //        onChange={}
        //value={title}
      />

      <QuillWrapper>
        <div className="quill_editor" ref={quillElement} />
        <div>
          <h4>Preview image from BLOB URL:</h4>
          {image.blob && <img src={URL.createObjectURL(image.blob)} />}
        </div>
        <hr />
        <div>
          <h4>Get file infomation from File Object:</h4>
          {image.file && (
            <div>
              <b>name:</b> <span>{image.file.name}</span> <br />
              <b>size:</b> <span>{image.file.size}</span> <br />
              <b>type:</b> <span>{image.file.type}</span>
            </div>
          )}
        </div>
      </QuillWrapper>
    </section>
  );
};
export default Editor;
/*
  return (
    <div className={styles.test}>
      <section className={styles.editorWrapper}>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle}
          //value={title}
        />

        <QuillWrapper>
          <div ref={quillElement} />
        </QuillWrapper>
      </section>
    </div>
  );
};
*/
