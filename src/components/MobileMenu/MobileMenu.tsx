import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '@context';

import styles from './MobileMenu.module.scss';

export interface MenuLink {
  id: number;
  route: string;
  title: string;
  anchor: string;
}

interface MenuProps {
  links: MenuLink[];
}

const MobileMenu = ({ links }: MenuProps) => {
  const {
    modal: { setModalContent },
  } = useContext(AppContext);

  const onLinkClick = () => {
    setModalContent(null);
  };

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
