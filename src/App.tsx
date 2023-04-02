import { useCallback, useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, useBeforeUnload } from 'react-router-dom';

import { ROUTES } from '@constants';
import { STORAGE_KEYS } from '@constants';
import { AppContext } from '@context';
import { BaseLayout } from '@layouts';
import { AboutUs, Error404, FormPage, MainPage } from '@pages';
import 'normalize.css';

import './App.scss';

export const routesConfig = [
  {
    path: '',
    element: <BaseLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: ROUTES.ABOUT_US,
        element: <AboutUs />,
      },
      {
        path: ROUTES.FORM,
        element: <FormPage />,
      },
    ],
  },
];

const App = () => {
  const initSearchValue = localStorage.getItem(STORAGE_KEYS.SEARCH_VALUE) ?? '';
  const [searchValue, setSearchValue] = useState<string>(initSearchValue);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const saveSearchValue = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, searchValue);
  }, [searchValue]);

  useEffect(() => saveSearchValue);
  useBeforeUnload(saveSearchValue);

  const contextValue = {
    search: {
      searchValue,
      setSearchValue,
    },
    modal: {
      modalContent,
      setModalContent,
    },
  };

  const router = createBrowserRouter(routesConfig);
  return (
    <AppContext.Provider value={contextValue}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
