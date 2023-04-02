import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Menu, MobileMenu } from '@components';
import { MENU_LINKS } from '@constants';
import { AppContext } from '@context';
import { getPageTitle } from '@helpers';
import base from '@scss/components/base.module.scss';

import styles from './Header.module.scss';

const Header = () => {
  const { pathname } = useLocation();
  const pageTitle = getPageTitle(pathname, MENU_LINKS);

  const {
    modal: { setModalContent },
  } = useContext(AppContext);

  const openMobileMenu = () => {
    setModalContent(<MobileMenu links={MENU_LINKS} />);
  };

  return (
    <div className={styles.header}>
      <div className={base.wrapper}>
        <div className={styles.header__container}>
          <h1 className={styles.header__title}>{pageTitle}</h1>
          <Menu links={MENU_LINKS} />
          <span className={styles.header__burger} onClick={openMobileMenu}>
            Open
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
