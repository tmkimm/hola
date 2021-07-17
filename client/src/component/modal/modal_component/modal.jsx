import styled, { keyframes } from "styled-components";
import Portal from "../portal/portal";

function Modal({ onClose, visible, children }) {
  const onMaskClick = (e) => {
    if (onClose === undefined) return;
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper onClick={onMaskClick} tabIndex={-1} visible={visible}>
        {children}
      </ModalWrapper>
    </Portal>
  );
}

const modalAnimation = keyframes`
  0% {
    opacity: 0;
    top: -200%;
  }
  
  100% {
    opacity: 1;
    top: 0;
  }
`;

//animation: 0.5s ease 0s 1 normal forwards running ${modalAnimation};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  top:0;
}
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(77, 77, 77, 0.5);
  z-index: 999;
`;

export default Modal;
