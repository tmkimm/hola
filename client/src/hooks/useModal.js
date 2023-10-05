import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from 'store/loginStep';

export const useLoginModal = () => {
  const modalVisible = useSelector((state) => state.loginStep.modalVisible);
  const dispatch = useDispatch();

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    dispatch(setModalVisible(true));
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    dispatch(setModalVisible(false));
  };

  return { modalVisible, openModal, closeModal };
};
