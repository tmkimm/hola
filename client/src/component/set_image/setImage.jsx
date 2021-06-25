import React from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../store/loginStep";
import { setUser } from "../../store/user";
import UserImageUpload from "../user_image_upload/userImageUpload";

const setImage = (props) => {
  const dispatch = useDispatch();
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [image, setImage] = useState(null);
  const handleLoginStep = () => {
    // 닉네임이 겹치면 빨간글씨로 띄워주자
    dispatch(setUser(image));
    dispatch(nextStep("SETIMAGE"));
  };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const nickName = e.target.nickName.value;
  //     console.log("###########nickName:", nickName);

  //     if (isImageChanged) {
  //       if (image) {
  //         const preSignedUrl = await studyService.getPresignedUrl(nickName);
  //         const fileName = `${nickName}_${getFormatedToday()}.png`;

  //         await studyService
  //           .uploadImageToS3WithBase64(preSignedUrl, image, fileName)
  //           .then((response) => {
  //             console.log("response from uploadUserimgtoS3", response);
  //           });
  //       }
  //     }

  //     await dispatch(addUserNickName({ id: user.id, nickName, image })).then(
  //       (response) => {
  //         console.log("addUserNickName response :", response);
  //         handleClose();
  //       }
  //     );
  //   };
  return (
    <>
      <UserImageUpload
        image={image}
        setImage={setImage}
        setIsImageChanged={setIsImageChanged}
      ></UserImageUpload>
      <button
        onClick={handleLoginStep}
        className={styles.buttonComplete}
        name="complete"
      >
        다음
      </button>
    </>
  );
};

export default setImage;
