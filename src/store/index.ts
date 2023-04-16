import { useGetPhotoQuery, useGetPhotosQuery } from './api/unsplashApi';
import { useAppDispatch, useAppSelector } from './hooks';
import { appSearchSlice } from './slice/appSearchSlice';
import { cardFormSlice } from './slice/cardFormSlice';
import { store } from './store';
import type { RootState } from './store';

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

export { store, storeActions, useAppDispatch, useAppSelector, RootState };
