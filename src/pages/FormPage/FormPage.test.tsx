import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from '@mocks';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FormPage from './FormPage';

describe('FormPage', () => {
  it('Render FormPage', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/form']}>
        <FormPage />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('form-element')).toHaveLength(7);
  });
});
