import { screen, waitFor } from '@testing-library/react';
import { renderWithStoreProvider } from '@utils';
import { describe, expect, it } from 'vitest';

import MainPage from './MainPage';

describe('Main page', () => {
  it('Render with default search', async () => {
    renderWithStoreProvider(<MainPage />);
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'photo' }).length).toBe(2);
    });
  });
});
