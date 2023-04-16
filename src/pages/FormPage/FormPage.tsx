import { useState } from 'react';

import { AddCardForm, Alert, Cards } from '@components';
import { Card } from '@components/types';
import { ALERT } from '@constants';
import { storeActions, useAppDispatch, useAppSelector } from '@store';

import styles from './FormPage.module.scss';

const { addFormCard } = storeActions.cardForm;

const FormPage = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cardForm.cards);
  const [isAllert, setIsAllert] = useState<boolean>(false);

  const onSubmit = (card: Card) => {
    dispatch(addFormCard(card));
    setIsAllert(true);
  };

  return (
    <>
      {isAllert && (
        <Alert
          type="success"
          message={ALERT.MESSAGES.CARD_SUCCESS}
          onAnimationEnd={() => setIsAllert(false)}
        />
      )}
      <div className={styles.form_wrapper}>
        <AddCardForm onSubmit={onSubmit} />
      </div>
      <Cards cards={cards} />
    </>
  );
};

export default FormPage;
