import { MenuLink } from '@components/types';

const getPageTitle = (route: string, routes: MenuLink[]): string => {
  const result = routes.find((item) => item.route === route);
  return result ? result.title : '';
};

export default getPageTitle;
