import { Card } from '@components';
import { Card as CardProps } from '@components/types';

import styles from './Cards.module.scss';

interface Cards {
  cards: CardProps[];
}

const Cards = ({ cards }: Cards) => {
  return (
    <div className={styles.cards} data-testid="cards">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Cards;
