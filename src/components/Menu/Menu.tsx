import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Menu.module.scss';

export interface MenuItem {
  id: number;
  route: string;
  title: string;
  anchor: string;
}

export interface MenuProps {
  links: MenuItem[];
}
class Menu extends Component<MenuProps, Record<string, never>> {
  render() {
    const { links } = this.props;

    return (
      <nav className={styles.nav}>
        {links.map((link) => {
          return (
            <NavLink
              to={link.route}
              key={link.id}
              className={({ isActive }) =>
                isActive ? `${styles.nav__link} ${styles.nav__link_active}` : styles.nav__link
              }
            >
              {link.anchor}
            </NavLink>
          );
        })}
      </nav>
    );
  }
}

export default Menu;
