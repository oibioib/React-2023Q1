import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { TEXT } from '@constants';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import 'whatwg-fetch';

import { routesConfig } from './App';

describe('Routes', () => {
  it('Render Main page', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(TEXT.PLACEHOLDERS.SEARCH)).toBeInTheDocument();
    });
  });

  it('Render About US', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/about'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('about')).toBeInTheDocument();
  });

  it('Render Error page', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/abracadabra'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
  });

  it('Render Form page', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/form'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('add-card-form')).toBeInTheDocument();
  });
});
