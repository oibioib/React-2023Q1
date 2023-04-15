import { useEffect, useState } from 'react';

import { getPhotos, preparePhoto } from '@api';
import { Loader, MainCards, Search } from '@components';
import { MainCardProps } from '@components/types';
import { STORAGE_KEYS, TEXT } from '@constants';
import { MainPageContext } from '@context';
import base from '@scss/components/base.module.scss';

const MainPage = () => {
  const initSearchValue = localStorage.getItem(STORAGE_KEYS.SEARCH_VALUE) ?? '';
  const [searchValue, setSearchValue] = useState<string>(initSearchValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mainCards, setMainCards] = useState<MainCardProps[]>([]);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    throw error;
  }

  const doSearch = async (searchStr: string) => {
    try {
      setIsLoading(true);
      const photos = await getPhotos(searchStr);
      setMainCards(photos.results.map(preparePhoto));
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isInit) {
      doSearch(searchValue);
      setIsInit(false);
    }
  }, [isInit, searchValue]);

  const contextValue = {
    searchValue,
    setSearchValue,
    doSearch,
  };

  return (
    <MainPageContext.Provider value={contextValue}>
      <Search />
      {isLoading && <Loader />}
      {!isLoading && mainCards.length > 0 && <MainCards cards={mainCards} />}
      {!isLoading && !mainCards.length && (
        <p className={base.center}>{TEXT.MESSAGES.NO_CARDS_FOUNDED}</p>
      )}
    </MainPageContext.Provider>
  );
};

export default MainPage;
