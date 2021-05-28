import React from "react";
import styles from "./userImageUpload.module.css";
import { isBase64 } from "../../common/utils";



const UserImageUpload = ({ image, setImage, setIsImageChanged}) => {
  const defaultImage = 'https://media.vlpt.us/images/seeh_h/profile/6b7bfde5-b67c-4665-a2e1-a308e8de2059/tt.PNG?w=120';

  // 이미지 업로드 버튼
  const onImageUploadClick = async(e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    setIsImageChanged(true);
  }

  // 이미지 삭제 버튼
  const onImageRemoveClick = async(e) => {
    setImage('');
    setIsImageChanged(true);
  }

  return (
    <div className={styles.image}>
    <img
      className={styles.userImg}
      src={image ? isBase64(image) ? image : `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${image}` : defaultImage}
      alt="사용자 이미지"/>
    <div className={styles.imageControl}>
      <label className={styles.customLabelFileUpload}>
        이미지 선택
        <input id="imageUpload" type="file" accept="image/*" onChange={onImageUploadClick}/>
      </label>
      <button onClick={onImageRemoveClick} className={styles.buttonImageDelete} name="removeImage">이미지 제거</button>
    </div>
  </div>
  );
};

export default UserImageUpload;
