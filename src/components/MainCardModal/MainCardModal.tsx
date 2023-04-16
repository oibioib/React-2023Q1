import { useEffect, useState } from 'react';

import { ErrorMessage, Loader } from '@components';
import { formatDate, getErrorMessage, loadImage } from '@helpers';
import { storeActions } from '@store';

import styles from './MainCard.module.scss';

const { useGetPhotoQuery } = storeActions.unsplashApi;

const MainCardModal = ({ id }: { id: string }) => {
  const { data, isFetching, isError, isLoading, error } = useGetPhotoQuery(id);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (data) {
        await loadImage(data.img);
        setIsImageLoaded(true);
      }
    })();
  }, [data]);

  return (
    <>
      {(isLoading || isFetching) && (
        <div className={styles['main-card-modal__loader']}>
          <Loader />
        </div>
      )}

      {isError && <ErrorMessage message={getErrorMessage(error)} />}

      {data && (
        <div className={styles['main-card-modal']}>
          <img className={styles['main-card-modal__avatar']} src={data.authorAvatar} />
          <span className={styles['main-card-modal__author']}>{data.author}</span>
          <span className={styles['main-card-modal__date']}>{formatDate(data.createdAt)}</span>
          <span className={styles['main-card-modal__description']}>{data.description}</span>
          {isImageLoaded && <img className={styles['main-card-modal__image']} src={data.img} />}
        </div>
      )}
    </>
  );
};

export default MainCardModal;
