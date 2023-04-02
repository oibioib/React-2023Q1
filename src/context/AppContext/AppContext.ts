import { createContext } from 'react';

interface AppContext {
  search: {
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
  };
  modal: {
    modalContent: JSX.Element | null;
    setModalContent: (modalContent: JSX.Element | null) => void;
  };
}

export const AppContext = createContext<AppContext>({
  search: {
    searchValue: '',
    setSearchValue: () => {},
  },
  modal: {
    modalContent: null,
    setModalContent: () => {},
  },
});
