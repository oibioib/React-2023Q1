import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { AppContext } from '@context';

import styles from './Modal.module.scss';

const Modal = () => {
  const {
    modal: { modalContent, setModalContent },
  } = useContext(AppContext);

  const onCloseModal = () => {
    setModalContent(null);
  };

  const onClickModalContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (modalContent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalContent]);

  const modalStyles = modalContent ? [styles.modal, styles.modal_active].join(' ') : styles.modal;
  const modalContentStyles = modalContent
    ? [styles.modal__content, styles.modal__content_active].join(' ')
    : styles.modal__content;

  return createPortal(
    <div className={modalStyles} onMouseDown={onCloseModal}>
      <div className={modalContentStyles} onMouseDown={onClickModalContent}>
        <span onMouseDown={onCloseModal} className={styles.modal__close} />
        {modalContent}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
