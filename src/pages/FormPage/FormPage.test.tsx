import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import FormPage from './FormPage';

describe('FormPage', () => {
  it('Render FormPage', () => {
    render(
      <MemoryRouter initialEntries={['/form']}>
        <FormPage />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('form-element')).toHaveLength(7);
  });
});
