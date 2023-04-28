import { useEffect } from 'react';

import { ErrorMessage, Loader } from '@components';
import { formatDate, getErrorMessage, loadImage } from '@helpers';
import { storeActions } from '@store';

import styles from './MainCardModal.module.scss';

const { useGetPhotoQuery } = storeActions.unsplashApi;

const MainCardModal = ({ id, preview }: { id: string; preview: string }) => {
  const { data, isFetching, isError, isLoading, error } = useGetPhotoQuery(id);

  useEffect(() => {
    (async () => {
      if (data) {
        await loadImage(data.img);
      }
    })();
  }, [data]);

  return (
    <div className={styles['main-card-modal']}>
      <div className={(isError && styles['error']) || undefined}>
        {data && (
          <>
            <div className={styles['main-card-modal__info']}>
              <img className={styles['main-card-modal__avatar']} src={data.authorAvatar} />
              <span className={styles['main-card-modal__author']}>{data.author}</span>
              <span className={styles['main-card-modal__date']}>{formatDate(data.createdAt)}</span>
            </div>
            <p className={styles['main-card-modal__description']}>{data.description}</p>
          </>
        )}
        <div className={styles['main-card-modal__image']}>
          <img className={styles['main-card-modal__image-preview']} src={preview} />
          {data && <img className={styles['main-card-modal__image-full']} src={data.img} />}
        </div>
      </div>

      {(isLoading || isFetching) && (
        <div className={styles['main-card-modal__loader']}>
          <Loader />
        </div>
      )}

      {isError && (
        <div className={styles['main-card-modal__error']}>
          <ErrorMessage message={getErrorMessage(error)} />
        </div>
      )}
    </div>
  );
};

export default MainCardModal;
