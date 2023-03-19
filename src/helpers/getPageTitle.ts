import { MenuItem } from '@components';

const getPageTitle = (route: string, routes: MenuItem[]): string => {
  const result = routes.find((item) => item.route === route);
  return result ? result.title : '';
};

export default getPageTitle;
