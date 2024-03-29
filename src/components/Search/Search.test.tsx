import { TEXT } from '@constants';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithStoreProvider } from '@utils';
import { describe, expect, it } from 'vitest';

import Search from './Search';

describe('Search', () => {
  const TEST_INPUT_TEXT = 'test search input';
  it('Render search placeholder', () => {
    renderWithStoreProvider(<Search />);
    const searchInput = screen.getByPlaceholderText<HTMLInputElement>(TEXT.PLACEHOLDERS.SEARCH);
    expect(searchInput).toBeInTheDocument();
  });

  it('Change search value', async () => {
    renderWithStoreProvider(<Search />);
    const searchInput = screen.getByPlaceholderText<HTMLInputElement>(TEXT.PLACEHOLDERS.SEARCH);
    await userEvent.type(searchInput, TEST_INPUT_TEXT);
    expect(searchInput.value).toBe(TEST_INPUT_TEXT);
  });

  it('Clear search value', async () => {
    renderWithStoreProvider(<Search />);
    const searchInput = screen.getByPlaceholderText<HTMLInputElement>(TEXT.PLACEHOLDERS.SEARCH);
    await userEvent.type(searchInput, TEST_INPUT_TEXT);
    const searchClear = screen.getByTestId<HTMLSpanElement>('search-clear');
    await userEvent.click(searchClear);
    expect(searchInput.value).toBe('');
  });
});
