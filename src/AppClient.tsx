import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routesConfig } from '@routes';
import { setupStore } from '@store';
import 'normalize.css';

import './App.scss';

const store = setupStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

const router = createBrowserRouter(routesConfig);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
