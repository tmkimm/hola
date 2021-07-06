import React from "react";
import styles from "./userImageUpload.module.css";
import { isBase64 } from "../../common/utils";

const UserImageUpload = ({ image, setImage, setIsImageChanged }) => {
  const defaultImage =
    "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG";

  // 이미지 업로드 버튼
  const onImageUploadClick = async (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    setIsImageChanged(true);
  };

  // 이미지 삭제 버튼
  const onImageRemoveClick = async (e) => {
    setImage("");
    setIsImageChanged(true);
  };

  return (
    <div className={styles.image}>
      <img
        className={styles.userImg}
        src={
          image
            ? isBase64(image)
              ? image
              : `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${image}`
            : defaultImage
        }
        alt="사용자 이미지"
      />
      <div className={styles.imageControl}>
        <label className={styles.customLabelFileUpload}>
          이미지 선택
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={onImageUploadClick}
          />
        </label>
        <button
          onClick={onImageRemoveClick}
          className={styles.buttonImageDelete}
        >
          이미지 제거
        </button>
      </div>
    </div>
  );
};

export default UserImageUpload;
