import { useGetUserInfo } from 'domains/myPage/hooks/useGetUserInfo';
import Modal from '../modal_component/modal';
import styles from './userDetailModal.module.css';

const getPositionToText = (position) => {
  switch (position) {
    case 'FE':
      return '프론트엔드 개발자';
    case 'BE':
      return '백엔드 개발자';
    case 'DE':
      return '디자이너';
    case 'IOS':
      return 'IOS 개발자';
    case 'AND':
      return '안드로이드 개발자';
    case 'DEVOPS':
      return '데브옵스 엔지니어';
    case 'PM':
      return 'PM';
    case 'PD':
      return '기획자';
    default:
      return '';
  }
};
const UserDetailModal = ({ id, isOpen, closeModal }) => {
  const { isLoading, data } = useGetUserInfo(id);

  if (isLoading) return <></>;

  const {
    nickName,
    position,
    organizationName,
    organizationIsOpen,
    likeLanguages,
    image,
    introduce,
    urls,
    workExperience,
  } = data;
  return (
    <Modal visible={isOpen} name='userInfo' onClose={closeModal}>
      <div className={styles.wrapper}>
        <div className={styles.modalHeader}>
          <img
            className={styles.backButton}
            src='images/info/arrow-right.png'
            alt='backBtn'
            onClick={closeModal}
          />
          <img className={styles.moreButton} src='images/info/moreBtn.png' alt='moreBtn' />
        </div>
        <div className={styles.modalContent}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={`https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${data.image}`}
              alt='user avatar'
            />
          </div>
          <div className={styles.nickname}>{nickName}</div>
          <div className={styles.careerInfoAndUrl}>
            <div className={styles.careerInfo}>
              {position && <div className={styles.position}>{getPositionToText(position)}</div>}
              {workExperience && <div className={styles.workExperience}>{workExperience}년차</div>}
              {organizationIsOpen && organizationName && (
                <div className={styles.organizationName}>{organizationName}</div>
              )}
            </div>
            {/* TODO: url 적용 필요 */}
            {/* <ul className={styles.urls}>
              <li>a</li>
              <li>b</li>
              <li>c</li>
            </ul> */}
          </div>
          <div className={styles.languagesText}>관심 기술</div>
          <ul className={styles.likeLanguages}>
            {likeLanguages.map((lang) => (
              <li className={styles.languageItem}>{lang}</li>
            ))}
          </ul>
          <div className={styles.introduces}>
            {introduce ? introduce : 'Hola! 만나서 반가워요!'}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailModal;