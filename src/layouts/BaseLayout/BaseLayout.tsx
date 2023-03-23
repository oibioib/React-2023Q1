import { Component } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@layouts';
import layout from '@scss/layouts/layout.module.scss';

import styles from './BaseLayout.module.scss';

class BaseLayout extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <div className={layout.wrapper}>
          <Outlet />
        </div>
      </div>
    );
  }
}

export default BaseLayout;
