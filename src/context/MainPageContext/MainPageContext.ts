import { createContext } from 'react';

interface MainPageContext {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  doSearch: (searchValue: string) => void;
}

export const MainPageContext = createContext<MainPageContext>({
  searchValue: '',
  setSearchValue: () => {},
  doSearch: () => {},
});
