import { unsplashApi, useGetPhotoQuery, useGetPhotosQuery } from './api/unsplashApi';
import { useAppDispatch, useAppSelector } from './hooks';
import { appSearchSlice } from './slice/appSearchSlice';
import { cardFormSlice } from './slice/cardFormSlice';
import { rootReducer, setupStore, store } from './store';
import type { AppStore, RootState } from './store';

const storeActions = {
  appSearch: {
    ...appSearchSlice.actions,
  },
  cardForm: {
    ...cardFormSlice.actions,
  },
  unsplashApi: {
    useGetPhotosQuery,
    useGetPhotoQuery,
  },
};

export {
  store,
  setupStore,
  storeActions,
  useAppDispatch,
  useAppSelector,
  unsplashApi,
  rootReducer,
};
export type { RootState, AppStore };
