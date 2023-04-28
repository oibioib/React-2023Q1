import { MainCardProps } from '@components/types';
import { API } from '@constants';

import { createApi, fetchBaseQuery } from '../reduxToolkitRaw';
import { logUnsplashLimits, transformUnsplashPhoto } from './unsplashApi.helpers';

export interface UnsplashPhoto {
  id: string;
  width: number;
  height: number;
  created_at: string;
  color: string;
  likes: number;
  description: string;
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
  urls: {
    regular: string;
    small: string;
  };
}

export interface UnsplashResult {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export const unsplashApi = createApi({
  reducerPath: 'unsplashApi',
  baseQuery: fetchBaseQuery({ baseUrl: API.URL }),
  endpoints: (builder) => ({
    getPhotos: builder.query<MainCardProps[], string>({
      query: (searchValue) => ({
        url: API.ENDPOINT.PHOTOS,
        params: {
          query: searchValue || API.DEFAULT_QUERY,
          per_page: API.PARAMS.PER_PAGE,
          orientation: API.PARAMS.ORIENTATION,
        },
      }),
      transformResponse: (response: UnsplashResult, meta): MainCardProps[] => {
        if (meta && meta.response) logUnsplashLimits(meta.response, 'PHOTOS');
        return response.results.map(transformUnsplashPhoto);
      },
    }),
    getPhoto: builder.query<MainCardProps, string>({
      query: (id) => ({
        url: `${API.ENDPOINT.SINGLE_PHOTO}/${id}`,
      }),
      transformResponse: (response: UnsplashPhoto, meta): MainCardProps => {
        if (meta && meta.response) logUnsplashLimits(meta.response, 'SINGLE PHOTO');
        return transformUnsplashPhoto(response);
      },
    }),
  }),
});

export const { useGetPhotosQuery, useGetPhotoQuery } = unsplashApi;
