import { MenuLink } from '@components/types';

export const ROUTES = {
  MAIN: '/',
  ABOUT_US: 'about',
  FORM: 'form',
};

export const MENU_LINKS: MenuLink[] = [
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

const PREFIX = 'oibioib_';

export const STORAGE_KEYS = {
  SEARCH_VALUE: `${PREFIX}search_value`,
};

export const TEXT = {
  PLACEHOLDERS: {
    SEARCH: 'Search something...',
  },
  MESSAGES: {
    NOT_FOUND: 'Page not found!',
    GO_MAIN: 'Go to main page!',
    NO_FILE: 'No image selected',
    NO_CARDS_FOUNDED: 'Nothing found. Please, refine your search criteria.',
    ERROR: 'Oops! Something went wrong...',
  },
  BUTTONS: {
    SELECT_IMAGE: 'Select an image',
  },
};

export const ALERT = {
  MESSAGES: {
    CARD_SUCCESS: 'Card added successfully!',
  },
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

export const IMAGE_TYPES = ['image/jpeg', 'image/png'];
