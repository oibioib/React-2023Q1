import { Component } from 'react';

import { Menu } from '@components';
import { MENU_LINKS } from '@constants';
import { getPageTitle } from '@helpers';
import { WithLocationProps, withLocation } from '@hoc';
import layout from '@scss/layouts/layout.module.scss';

import styles from './Header.module.scss';

class Header extends Component<WithLocationProps, Record<string, never>> {
  render() {
    const {
      location: { pathname },
    } = this.props;

    const pageTitle = getPageTitle(pathname, MENU_LINKS);

    return (
      <div className={styles.header}>
        <div className={layout.wrapper}>
          <div className={styles.header__container}>
            <h1 className={styles.header__title}>{pageTitle}</h1>
            <Menu links={MENU_LINKS} />
          </div>
        </div>
      </div>
    );
  }
}

export default withLocation(Header);
