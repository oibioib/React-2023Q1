import { renderWithProviders } from '@mocks';
import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import 'whatwg-fetch';

import MainPage from './MainPage';

describe('Main page', () => {
  it('Render with default search', async () => {
    renderWithProviders(<MainPage />);
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'photo' }).length).toBe(2);
    });
  });
});
