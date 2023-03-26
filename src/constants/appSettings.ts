import { MenuItem } from 'components/types';

export const ROUTES = {
  MAIN: '/',
  ABOUT_US: 'about',
  FORM: 'form',
};

export const MENU_LINKS: MenuItem[] = [
  {
    id: 1,
    route: '/',
    title: 'Main',
    anchor: 'Main',
  },
  {
    id: 2,
    route: '/about',
    title: 'About Us',
    anchor: 'About Us',
  },
  {
    id: 3,
    route: '/form',
    title: 'Form',
    anchor: 'Form',
  },
  {
    id: 4,
    route: '/404',
    title: 'Error 404',
    anchor: '404',
  },
];

export const STORAGE_KEYS = {
  SEARCH_VALUE: 'search_value',
};

export const TEXT = {
  PLACEHOLDERS: {
    SEARCH: 'Search something...',
  },
  MESSAGES: {
    NOT_FOUND: 'Page not found!',
    GO_MAIN: 'Go to main page!',
  },
};
