import { MainCard } from '@components';
import { MainCardProps } from '@components/types';

import styles from './MainCards.module.scss';

interface MainCardsProps {
  cards: MainCardProps[];
}

const MainCards = ({ cards }: MainCardsProps) => {
  return (
    <div className={styles['main-cards']} data-testid="main-cards">
      {cards.map((card) => (
        <MainCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default MainCards;
