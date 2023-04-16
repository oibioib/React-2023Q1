import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';

import styles from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  onCloseModal: () => void;
}
const Modal = ({ children, onCloseModal }: ModalProps) => {
  const onClickModalContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const modalStyles = children ? [styles.modal, styles.modal_active].join(' ') : styles.modal;
  const modalContentStyles = children
    ? [styles.modal__content, styles.modal__content_active].join(' ')
    : styles.modal__content;

  return createPortal(
    <div className={modalStyles} onMouseDown={onCloseModal} data-testid="modal">
      <div className={modalContentStyles} onMouseDown={onClickModalContent}>
        <span
          onMouseDown={onCloseModal}
          className={styles.modal__close}
          data-testid="modal-close"
        />
        {children && <RemoveScroll>{children}</RemoveScroll>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
