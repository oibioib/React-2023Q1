import React from 'react';

import { Card } from '@components';
import { CardItem } from 'components/types';

import styles from './Cards.module.scss';

interface CardsProps {
  cards: CardItem[];
}

class Cards extends React.Component<CardsProps, Record<string, never>> {
  render() {
    const { cards } = this.props;

    return (
      <div className={styles.cards}>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    );
  }
}

export default Cards;
