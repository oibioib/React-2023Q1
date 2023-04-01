import { NavLink } from 'react-router-dom';

import styles from './Menu.module.scss';

export interface MenuLink {
  id: number;
  route: string;
  title: string;
  anchor: string;
}

interface MenuProps {
  links: MenuLink[];
}

const Menu = ({ links }: MenuProps) => {
  return (
    <nav className={styles.nav}>
      {links.map(({ id, route, anchor }) => {
        return (
          <NavLink
            to={route}
            key={id}
            className={({ isActive }) =>
              isActive ? `${styles.nav__link} ${styles.nav__link_active}` : styles.nav__link
            }
          >
            {anchor}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Menu;
