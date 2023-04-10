import { Outlet } from 'react-router-dom';

import { Modal } from '@components';
import { Header } from '@layouts';
import base from '@scss/components/base.module.scss';

const BaseLayout = () => {
  return (
    <div>
      <Header />
      <div className={base.wrapper}>
        <Outlet />
      </div>
      <Modal />
    </div>
  );
};

export default BaseLayout;
