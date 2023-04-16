import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { store } from '@store';
import { render } from '@testing-library/react';

const renderWithProviders = (ui: ReactElement) => ({
  store,
  ...render(ui, {
    wrapper: ({ children }: PropsWithChildren<object>) => {
      return <Provider store={store}>{children}</Provider>;
    },
  }),
});

export default renderWithProviders;
