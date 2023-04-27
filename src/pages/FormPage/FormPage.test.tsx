import { MemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { renderWithStoreProvider } from '@utils';
import { describe, expect, it } from 'vitest';

import FormPage from './FormPage';

describe('FormPage', () => {
  it('Render FormPage', () => {
    renderWithStoreProvider(
      <MemoryRouter initialEntries={['/form']}>
        <FormPage />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('form-element')).toHaveLength(7);
  });
});
