import { MainCard } from '@components';
import { MainCardProps } from '@components/types';
import { TEXT } from '@constants';
import base from '@scss/components/base.module.scss';

import styles from './MainCards.module.scss';

interface MainCardsProps {
  cards: MainCardProps[];
}

const MainCards = ({ cards }: MainCardsProps) => {
  return (
    <>
      {(cards.length || null) && (
        <div className={styles['main-cards']} data-testid="main-cards">
          {cards.map((card) => (
            <MainCard key={card.id} {...card} />
          ))}
        </div>
      )}
      {!cards.length && <p className={base.center}>{TEXT.MESSAGES.NO_CARDS_FOUNDED}</p>}
    </>
  );
};

export default MainCards;
