import { describe, it } from 'vitest';

import getPageTitle from './getPageTitle';

const testRoute = {
  about: '/about',
  noRoute: '/no-route',
};

const routes = [
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
];

describe('Helpers - getPageTitle()', () => {
  it('Route is in routes', () => {
    const title = getPageTitle(testRoute.about, routes);
    expect(title).toBe('About Us');
  });

  it('No route is in routes', () => {
    const title = getPageTitle(testRoute.noRoute, routes);
    expect(title).toBe('');
  });
});
