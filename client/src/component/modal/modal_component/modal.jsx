import styled from 'styled-components';
import Portal from '../portal/portal';
import { useEffect } from 'react';

const Modal = ({ name, onClose, visible, children }) => {
  const onMaskClick = (e) => {
    if (onClose === undefined) return;
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Portal elementId='modal-root'>
      <ModalOverlay name={name} visible={visible} />
      <ModalWrapper onClick={onMaskClick} tabIndex={-1} visible={visible}>
        {children}
      </ModalWrapper>
    </Portal>
  );
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  top: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${(props) => (props.name === 'loading' ? 'white' : '#000000CC')};
  z-index: 999;
`;

export default Modal;
