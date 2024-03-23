import React from 'react';
import styles from './setting.module.css';
import Navbar from 'component/nav_bar/navbar';
import LikeLanguages from 'component/like_languages/likeLanguages';
import UserImageUpload from 'component/user_image_upload/userImageUpload';
import Modal from 'component/modal/modal_component/modal';
import CancelButton from 'component/cancelButton/cancelButton';

const Setting = ({
  nickName,
  setNickName,
  likeLanguages,
  setLikeLanguages,
  image,
  setImage,
  setIsImageChanged,
  showPopup,
  openModal,
  closeModal,
  onCompleteClick,
  onSignOutClick,
}) => {
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1>내 정보 수정</h1>
        <UserImageUpload
          image={image}
          setImage={setImage}
          setIsImageChanged={setIsImageChanged}
        ></UserImageUpload>
        <div className={styles.titleWrapper}>
          <h3>닉네임</h3>
          <input
            type='text'
            name='nickNameInput'
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
        </div>
        <p className={styles.description}>Hola에서 사용되는 이름입니다.</p>
        <hr />
        <div className={`${styles.titleWrapper} ${styles.likeLanguages}`}>
          <h3>관심 기술 태그</h3>
          <div className={styles.likeLanguageWrapper}>
            <LikeLanguages
              placeholder={'관심 태그 선택'}
              likeLanguages={likeLanguages}
              setLikeLanguages={setLikeLanguages}
            ></LikeLanguages>
          </div>
        </div>
        <p className={styles.description}>관심 있는 기술 태그를 등록해주세요.</p>
        <hr />
        <button
          onClick={onCompleteClick}
          className={`${styles.buttonComplete} ${styles.mainButton}`}
          name='complete'
        >
          완료
        </button>
        <button
          onClick={openModal}
          className={`${styles.buttonSignOut} ${styles.mainButton}`}
          name='signOut'
        >
          회원탈퇴
        </button>

        <Modal visible={showPopup} onClose={closeModal}>
          <CancelButton
            confirmMsg='Hola에서 계정을 삭제하시겠어요?'
            positiveMsg='네, 삭제할래요'
            negativeMsg='아니요'
            onPublish={onSignOutClick}
            onCancel={closeModal}
          ></CancelButton>
        </Modal>
      </div>
    </>
  );
};

export default Setting;
