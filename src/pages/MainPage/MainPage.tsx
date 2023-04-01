import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBeforeUnload } from 'react-router-dom';

import { Cards, Search } from '@components';
import { STORAGE_KEYS, TEXT } from '@constants';
import { AppContext } from '@context';
import base from '@scss/components/base.module.scss';

import cards from '../../data/cards.json';

const MainPage = () => {
  const initSearchValue = localStorage.getItem(STORAGE_KEYS.SEARCH_VALUE) ?? '';
  const [searchValue, setSearchValue] = useState<string>(initSearchValue);

  const saveSearchValue = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, searchValue);
  }, [searchValue]);

  const cardsToRender = useMemo(
    () =>
      cards.filter(({ title, brand }) =>
        [title, brand].some((field) =>
          field.toLowerCase().includes(searchValue.toLowerCase().trim().replace(/[ ]+/g, ' '))
        )
      ),
    [searchValue]
  );

  useEffect(() => saveSearchValue);
  useBeforeUnload(saveSearchValue);

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <Search />
      {(cardsToRender.length && <Cards cards={cardsToRender} />) || (
        <p className={base.center}>{TEXT.MESSAGES.NO_CARDS_FOUNDED}</p>
      )}
    </AppContext.Provider>
  );
};

export default MainPage;
