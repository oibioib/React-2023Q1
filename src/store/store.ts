import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

import { unsplashApi } from './api/unsplashApi';
import appSearchReducer from './slice/appSearchSlice';
import cardFormReducer from './slice/cardFormSlice';

export const rootReducer = combineReducers({
  appSearch: appSearchReducer,
  cardForm: cardFormReducer,
  [unsplashApi.reducerPath]: unsplashApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(unsplashApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
