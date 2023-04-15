import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@components';
import { ROUTES } from '@constants';
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
        element: (
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        ),
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
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const contextValue = {
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
