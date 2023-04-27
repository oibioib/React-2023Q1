import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { TEXT } from '@constants';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithStoreProvider } from '@utils';
import { describe, expect, it } from 'vitest';

import { routesConfig } from './App';

const AppRouterProvider = ({ route }: { route: string }) => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [route],
  });
  return <RouterProvider router={router} />;
};

describe('Routes', () => {
  describe('Rander Main page', () => {
    beforeEach(() => {
      renderWithStoreProvider(<AppRouterProvider route="/" />);
    });

    it('Search to be on the page', async () => {
      const input = await screen.findByPlaceholderText(TEXT.PLACEHOLDERS.SEARCH);
      expect(input).toBeInTheDocument();
    });

    it('Cards to be on the page', async () => {
      const cards = await screen.findAllByRole('img', { name: 'photo' });
      expect(cards.length).toBe(2);
    });

    it('Open modal on card click', async () => {
      const [mainCard] = await screen.findAllByTestId('main-card');
      expect(mainCard).toBeInTheDocument();
      await userEvent.click(mainCard);
      const modal = screen.getByTestId('modal');
      expect(modal).toBeInTheDocument();
    });

    it('Open modal on card click and close', async () => {
      const [mainCard] = await screen.findAllByTestId('main-card');
      expect(mainCard).toBeInTheDocument();
      await userEvent.click(mainCard);
      const modal = screen.getByTestId('modal');
      const modalClose = screen.getByTestId('modal-close');
      await userEvent.click(modalClose);
      expect(modal).not.toBeInTheDocument();
    });

    it('Render error message when api response with error', async () => {
      const input = await screen.findByPlaceholderText(TEXT.PLACEHOLDERS.SEARCH);
      await userEvent.type(input, 'errorQuery{enter}');
      const errorMessage = await screen.findByText(/Test error query/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('Render About US', async () => {
    renderWithStoreProvider(<AppRouterProvider route="/about" />);
    expect(screen.getAllByText(/lorem ipsum/i)[0]).toBeInTheDocument();
  });

  it('Render Error page', async () => {
    renderWithStoreProvider(<AppRouterProvider route="/abracadabra" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
  });

  it('Render Form page', async () => {
    renderWithStoreProvider(<AppRouterProvider route="/form" />);
    expect(screen.getByTestId('add-card-form')).toBeInTheDocument();
  });
});
