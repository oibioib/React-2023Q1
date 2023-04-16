import { configureStore } from '@reduxjs/toolkit';

import { unsplashApi } from './api/unsplashApi';
import appSearchReducer from './slice/appSearchSlice';
import cardFormReducer from './slice/cardFormSlice';

export const store = configureStore({
  reducer: {
    appSearch: appSearchReducer,
    cardForm: cardFormReducer,
    [unsplashApi.reducerPath]: unsplashApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(unsplashApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
