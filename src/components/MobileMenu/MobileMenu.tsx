import { NavLink } from 'react-router-dom';

import styles from './MobileMenu.module.scss';

export interface MenuLink {
  id: number;
  route: string;
  title: string;
  anchor: string;
}

interface MenuProps {
  links: MenuLink[];
  onLinkClick: () => void;
}

const MobileMenu = ({ links, onLinkClick }: MenuProps) => {
  return (
    <nav className={styles.nav} data-testid="menu-mobile">
      {links.map(({ id, route, anchor }) => {
        return (
          <NavLink
            data-testid="menu-link"
            to={route}
            key={id}
            className={({ isActive }) =>
              isActive ? `${styles.nav__link} ${styles.nav__link_active}` : styles.nav__link
            }
            onClick={onLinkClick}
          >
            {anchor}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileMenu;
