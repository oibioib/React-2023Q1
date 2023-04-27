import { MemoryRouter } from 'react-router-dom';

import { TEXT } from '@constants';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Error404 from './Error404';

describe('Error404', () => {
  it('Render Error404', () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <Error404 />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
    expect(screen.getByText(TEXT.MESSAGES.NOT_FOUND)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(TEXT.MESSAGES.GO_MAIN);
  });
});
