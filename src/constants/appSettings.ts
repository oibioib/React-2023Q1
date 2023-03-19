import { MenuItem } from '@components';

export const ROUTES = {
  ABOUT_US: 'about',
};

export const MENU_LINKS: MenuItem[] = [
  {
    id: 1,
    route: '/',
    title: 'Main page',
    anchor: 'Main',
  },
  {
    id: 2,
    route: '/about',
    title: 'About us page',
    anchor: 'About Us',
  },
];
