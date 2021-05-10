import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import Quill from "quill";
import styles from "./editor.module.css";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";

/* 

Quill을 이용한 editor 입니다.

To-do
styled-component 제거
input 관리 redux 적용


*/

const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    padding: 0;
    min-height: 320px;
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
    quillInstance.current = new Quill("#editor-container", {
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
      placeholder: "Copy & paste, or drag an image here...",
      readOnly: false,
      theme: "snow",
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

  const onChangeTitle = (e) => {
    //onChangeField({ key: "title", value: e.target.value });
  };
*/

  return (
    <div className="edit">
      <div id="editor-container" style={{ height: "480px" }}></div>

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
    </div>
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
