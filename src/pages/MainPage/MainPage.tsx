import { useContext } from 'react';

import { Cards, Search } from '@components';
import { TEXT } from '@constants';
import { AppContext } from '@context';
import base from '@scss/components/base.module.scss';

import cards from '../../data/cards.json';

const MainPage = () => {
  const {
    search: { searchValue },
  } = useContext(AppContext);

  const cardsToRender = cards.filter(({ title, brand }) =>
    [title, brand].some((field) =>
      field.toLowerCase().includes(searchValue.toLowerCase().trim().replace(/[ ]+/g, ' '))
    )
  );

  return (
    <>
      <Search />
      {(cardsToRender.length && <Cards cards={cardsToRender} />) || (
        <p className={base.center}>{TEXT.MESSAGES.NO_CARDS_FOUNDED}</p>
      )}
    </>
  );
};

export default MainPage;
