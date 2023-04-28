import React from 'react';
import ReactDOMServer, { RenderToPipeableStreamOptions } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { HtmlTemplate } from '@components';
import { routesConfig } from '@routes';
import { setupStore, unsplashApi } from '@store';

export type ServerRender = (
  url: string,
  clientScript: string,
  clientStyle: string | undefined,
  opts: RenderToPipeableStreamOptions
) => Promise<ReactDOMServer.PipeableStream>;

export const render: ServerRender = async (url, clientScript, clientStyle, opts) => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [url],
  });

  const store = setupStore();
  await store.dispatch(unsplashApi.endpoints.getPhotos.initiate(''));
  const preloadedState = store.getState();

  const stream = ReactDOMServer.renderToPipeableStream(
    <React.StrictMode>
      <HtmlTemplate preloadedState={preloadedState} style={clientStyle}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </HtmlTemplate>
    </React.StrictMode>,
    {
      bootstrapModules: [clientScript],
      ...opts,
    }
  );

  return stream;
};
