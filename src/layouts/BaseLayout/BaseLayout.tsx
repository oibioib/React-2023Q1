import { Outlet } from 'react-router-dom';

import { ErrorBoundary, Modal } from '@components';
import { Header } from '@layouts';
import base from '@scss/components/base.module.scss';

const BaseLayout = () => {
  return (
    <div>
      <Header />
      <div className={base.wrapper}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
      <Modal />
    </div>
  );
};

export default BaseLayout;
