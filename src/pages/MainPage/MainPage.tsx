import { useEffect, useRef, useState } from 'react';
import { useBeforeUnload } from 'react-router-dom';

import { Cards, Search } from '@components';
import { STORAGE_KEYS, TEXT } from '@constants';
import { MainPageContext } from '@context';
import base from '@scss/components/base.module.scss';

import cards from '../../data/cards.json';

const MainPage = () => {
  const initSearchValue = localStorage.getItem(STORAGE_KEYS.SEARCH_VALUE) ?? '';
  const [searchValue, setSearchValue] = useState<string>(initSearchValue);
  const value = useRef<string>(initSearchValue);

  const saveSearchValue = () => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, value.current);
  };

  useEffect(() => {
    value.current = searchValue;
  }, [searchValue]);

  useEffect(() => saveSearchValue, []);
  useBeforeUnload(saveSearchValue);

  const cardsToRender = cards.filter(({ title, brand }) =>
    [title, brand].some((field) =>
      field.toLowerCase().includes(searchValue.toLowerCase().trim().replace(/[ ]+/g, ' '))
    )
  );

  const contextValue = {
    searchValue,
    setSearchValue,
  };

  return (
    <MainPageContext.Provider value={contextValue}>
      <Search />
      {(cardsToRender.length && <Cards cards={cardsToRender} />) || (
        <p className={base.center}>{TEXT.MESSAGES.NO_CARDS_FOUNDED}</p>
      )}
    </MainPageContext.Provider>
  );
};

export default MainPage;
