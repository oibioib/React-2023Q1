import { useState } from 'react';

import { AddCardForm, Alert, Cards } from '@components';
import { ALERT } from '@constants';
import { Card } from 'components/types';

import styles from './FormPage.module.scss';

const FormPage = () => {
  const [isAllert, setIsAllert] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);

  const onSubmit = (card: Card) => {
    setCards((cards) => [...cards, card]);
    setIsAllert(true);

    setTimeout(() => {
      setIsAllert(false);
    }, ALERT.DURATION_MS);
  };

  return (
    <>
      {isAllert && (
        <Alert message={ALERT.MESSAGES.CARD_SUCCESS} backgroundColor={ALERT.COLORS.SUCCESS} />
      )}
      <div className={styles.form_wrapper}>
        <AddCardForm onSubmit={onSubmit} />
      </div>
      <Cards cards={cards} />
    </>
  );
};

export default FormPage;
