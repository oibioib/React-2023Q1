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

export const ALERT = {
  DURATION_MS: 2500,
  MESSAGES: {
    CARD_SUCCESS: 'Card added successfully!',
  },
  COLORS: {
    SUCCESS: '#53b053',
  },
};

export const FORM_ERROR_MESSAGE = {
  TITLE: 'Please enter a name',
  BRAND: 'Please select a brand from the list',
  DATE: 'Please select a date greater than now',
  CONDITION: 'Please select product condition',
  FILE: 'Please select jpg or png file',
};

export const BRANDS = ['Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Realme', 'Asus', 'Lenovo', 'LG'];

export const AVAILABLE = {
  TITLE: 'Available before',
};

export const CONDITION = {
  TITLE: 'Condition',
  NEW: 'new',
  USED: 'used',
};

export const DELIVERY = {
  TITLE: 'Delivery',
  YES: 'available',
  NO: 'unavailable',
  IS_AVAILABLE: 'Delivery available?',
};

export const IMAGE_FORMATS = ['jpg', 'png'];
