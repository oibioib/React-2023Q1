import { MenuLink } from '@components/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { v4 as uuidv4 } from 'uuid';

export const getPageTitle = (route: string, routes: MenuLink[]): string => {
  const result = routes.find((item) => item.route === route);
  return result ? result.title : '';
};

export const toTitleCase = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export const validateForm = {
  date: (date: string) => new Date(Date.now()) < new Date(date),
  image: (imageType: string, imageTypes: string[]) => imageTypes.includes(imageType),
};

export const generateId = () => uuidv4();

export const formatDate = (date: string) => {
  const data = new Date(date);
  return `${data.getDate().toString().padStart(2, '0')}.${(data.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${data.getFullYear()} `;
};

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ('status' in error) {
    return 'error' in error ? error.error : JSON.stringify(error.data);
  }
  if (error.message) {
    return error.message;
  }
  return 'Error message not defined';
};
