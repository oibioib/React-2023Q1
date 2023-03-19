import React from 'react';

import styles from './Card.module.scss';

export interface CardItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  image: string;
}

interface CardProps {
  card: CardItem;
}

class Card extends React.Component<CardProps, Record<string, never>> {
  render() {
    const { title, brand, image } = this.props.card;
    return (
      <div className={styles.card}>
        <div>
          <img className={styles.card__image} src={image} alt={`${brand} ${title}`} />
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__title}>{title}</div>
          <div className={styles.card__brand}>{brand}</div>
        </div>
      </div>
    );
  }
}

export default Card;
