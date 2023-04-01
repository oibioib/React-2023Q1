import { Outlet } from 'react-router-dom';

import { Header } from '@layouts';
import base from '@scss/components/base.module.scss';

const BaseLayout = () => {
  return (
    <div>
      <Header />
      <div className={base.wrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
