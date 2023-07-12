import { useState } from 'react';

export const useModalState = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setModalVisible(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setModalVisible(false);
  };

  return { modalVisible, openModal, closeModal };
};
