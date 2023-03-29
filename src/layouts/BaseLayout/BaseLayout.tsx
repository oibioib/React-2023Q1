import { Component } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@layouts';
import base from '@scss/components/base.module.scss';

import styles from './BaseLayout.module.scss';

class BaseLayout extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <div className={base.wrapper}>
          <Outlet />
        </div>
      </div>
    );
  }
}

export default BaseLayout;
