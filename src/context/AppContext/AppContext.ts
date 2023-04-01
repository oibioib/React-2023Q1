import { createContext } from 'react';

interface AppContext<T> {
  searchValue: T;
  setSearchValue: (searchValue: T) => void;
}

export const AppContext = createContext<AppContext<string>>({
  searchValue: '',
  setSearchValue: () => {},
});
