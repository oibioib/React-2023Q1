import { useEffect, useState } from 'react';

import { getPhoto, preparePhoto } from '@api';
import { MainCardProps } from '@components/types';

import styles from './MainCard.module.scss';

const MainCardModal = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mainCardModal, setMainCardModal] = useState<MainCardProps | null>(null);
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    throw error;
  }

  const loadImage = (src: string) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(true);
    });

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const photo = await getPhoto(id);
        const resultPhoto = preparePhoto(photo);
        await loadImage(resultPhoto.img);
        setMainCardModal(resultPhoto);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      }
      setIsLoading(false);
    })();
  }, [id]);

  const formatDate = (date: string) => {
    const data = new Date(date);
    return `${data.getDate().toString().padStart(2, '0')}.${(data.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${data.getFullYear()} `;
  };

  return (
    <>
      <div className={styles['main-card-modal']}>
        {isLoading && (
          <>
            <div className={styles['main-card-modal__avatar_loading']}></div>
            <div className={styles['main-card-modal__author_loading']}></div>
            <div className={styles['main-card-modal__date_loading']}></div>
            <div className={styles['main-card-modal__description_loading']}></div>
            <div className={styles['main-card-modal__image_loading']}></div>
          </>
        )}
        {!isLoading && mainCardModal && (
          <>
            <img className={styles['main-card-modal__avatar']} src={mainCardModal.authorAvatar} />
            <span className={styles['main-card-modal__author']}>{mainCardModal.author}</span>
            <span className={styles['main-card-modal__date']}>
              {formatDate(mainCardModal.createdAt)}
            </span>
            <span className={styles['main-card-modal__description']}>
              {mainCardModal.description}
            </span>
            <img className={styles['main-card-modal__image']} src={mainCardModal.img} />
          </>
        )}
      </div>
    </>
  );
};

export default MainCardModal;
