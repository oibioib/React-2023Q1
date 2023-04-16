import { Outlet } from 'react-router-dom';

import { Header } from '@layouts';
import base from '@scss/components/base.module.scss';

const BaseLayout = () => {
  return (
    <>
      <Header />
      <div className={base.wrapper}>
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
