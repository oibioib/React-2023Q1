import { createContext } from 'react';

export interface AppContext {
  modal: {
    modalContent: JSX.Element | null;
    setModalContent: (modalContent: JSX.Element | null) => void;
  };
}

export const AppContext = createContext<AppContext>({
  modal: {
    modalContent: null,
    setModalContent: () => {},
  },
});
