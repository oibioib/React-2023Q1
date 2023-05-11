import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Menu, MobileMenu, Modal } from '@components';
import { MENU_LINKS } from '@constants';
import { getPageTitle } from '@helpers';
import base from '@scss/components/base.module.scss';

import styles from './Header.module.scss';

const Header = () => {
  const { pathname } = useLocation();
  const pageTitle = getPageTitle(pathname, MENU_LINKS);
  const [isModalMenuOpen, setIsModalMenuOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.header}>
        <div className={base.wrapper}>
          <div className={styles.header__container}>
            <h1 className={styles.header__title}>{pageTitle}</h1>
            <Menu links={MENU_LINKS} />
            <div
              className={styles.header__burger}
              onClick={() => setIsModalMenuOpen(true)}
              data-testid="menu-burger"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      {isModalMenuOpen && (
        <Modal onCloseModal={() => setIsModalMenuOpen(false)}>
          <MobileMenu links={MENU_LINKS} onLinkClick={() => setIsModalMenuOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default Header;
