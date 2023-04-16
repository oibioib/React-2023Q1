import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { AppStore, RootState, rootReducer, unsplashApi } from '@store';
import { RenderOptions, render } from '@testing-library/react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const renderWithStoreProvider = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(unsplashApi.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithStoreProvider;
