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
