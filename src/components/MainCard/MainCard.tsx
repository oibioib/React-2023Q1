import { useState } from 'react';

import { MainCardModal, Modal } from '@components';

import styles from './MainCard.module.scss';

export interface MainCardProps {
  id: string;
  img: string;
  width: number;
  height: number;
  thumb: string;
  color: string;
  description: string;
  createdAt: string;
  likes: number;
  author: string;
  authorAvatar: string;
}

const MainCard = ({ id, thumb, description, author }: MainCardProps) => {
  const info = [description, author].filter((field) => field).join(' - ');
  const [isModalCardOpen, setIsModalCardOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles['main-card']}
        onClick={() => setIsModalCardOpen(true)}
        data-testid="main-card"
      >
        <img
          className={styles['main-card__image']}
          src={thumb}
          alt={info}
          title={info}
          aria-label="photo"
        />
      </div>
      {isModalCardOpen && (
        <Modal onCloseModal={() => setIsModalCardOpen(false)}>
          <MainCardModal id={id} />
        </Modal>
      )}
    </>
  );
};

export default MainCard;
