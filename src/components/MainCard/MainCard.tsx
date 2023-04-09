import { useContext } from 'react';

import { ErrorBoundary, MainCardModal } from '@components';
import { AppContext } from '@context';

import styles from './MainCard.module.scss';

export interface MainCardProps {
  id: string;
  img: string;
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

  const {
    modal: { setModalContent },
  } = useContext(AppContext);

  const openMainCardModal = () => {
    setModalContent(
      <ErrorBoundary>
        <MainCardModal id={id} />
      </ErrorBoundary>
    );
  };

  return (
    <div className={styles['main-card']} onClick={openMainCardModal}>
      <img className={styles['main-card__image']} src={thumb} alt={info} title={info} />
    </div>
  );
};

export default MainCard;
