import { Component } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@constants';
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

class App extends Component {
  render() {
    const router = createBrowserRouter(routesConfig);
    return <RouterProvider router={router} />;
  }
}

export default App;
