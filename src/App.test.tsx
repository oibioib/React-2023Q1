import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { TEXT } from '@constants';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import App, { routesConfig } from './App';

describe('Routes', () => {
  it('Render Main page', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByPlaceholderText(TEXT.PLACEHOLDERS.SEARCH)).toBeInTheDocument();
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
});

describe('App', () => {
  it('Render App', async () => {
    render(<App />);
    expect(screen.getByPlaceholderText(TEXT.PLACEHOLDERS.SEARCH)).toBeInTheDocument();
    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });
});
