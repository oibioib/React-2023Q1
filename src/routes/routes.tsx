import { ErrorBoundary } from '@components';
import { ROUTES } from '@constants';
import { BaseLayout } from '@layouts';
import { AboutUs, Error404, FormPage, MainPage } from '@pages';

const routesConfig = [
  {
    path: '',
    element: <BaseLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: '',
        element: (
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        ),
      },
      {
        path: ROUTES.ABOUT_US,
        element: <AboutUs />,
      },
      {
        path: ROUTES.FORM,
        element: <FormPage />,
      },
    ],
  },
];

export default routesConfig;
