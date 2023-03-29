import React from 'react';

import { AVAILABLE, CONDITION, DELIVERY } from '@constants';

import styles from './Card.module.scss';

export interface CardItem {
  id: number;
  title: string;
  brand: string;
  image: string;
  date: string;
  condition: string;
  delivery: boolean;
}

interface CardProps {
  card: CardItem;
}

class Card extends React.Component<CardProps, Record<string, never>> {
  render() {
    const { title, brand, image, date, condition, delivery } = this.props.card;
    return (
      <div className={styles.card} data-testid="card">
        <div>
          <img className={styles.card__image} src={image} alt={`${brand} ${title}`} />
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__title}>{title}</div>
          <div className={styles.card__brand}>{brand}</div>
          <div className={styles.card__extra}>
            {AVAILABLE.TITLE}: {date}
          </div>
          <div className={styles.card__extra}>
            {CONDITION.TITLE}: {condition}
          </div>
          <div className={styles.card__extra}>
            {DELIVERY.TITLE}: {delivery ? DELIVERY.YES : DELIVERY.NO}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
