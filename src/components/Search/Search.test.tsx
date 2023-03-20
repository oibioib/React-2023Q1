import { STORAGE_KEYS, TEXT } from '@constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

import Search from './Search';

describe('Search', () => {
  it('Render search placeholder', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(TEXT.PLACEHOLDERS.SEARCH)).toBeInTheDocument();
  });

  it('Change search value', async () => {
    render(<Search />);
    const searchInput = screen.getByTestId('search') as HTMLInputElement;
    await userEvent.type(searchInput, 'test search input');
    expect(searchInput.value).toBe('test search input');
  });

  it('Save and Load search value', () => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, 'test search save');
    render(<Search />);
    const searchValueFromLocalstorage = localStorage.getItem(STORAGE_KEYS.SEARCH_VALUE);
    if (searchValueFromLocalstorage) {
      const searchInput = screen.getByTestId('search') as HTMLInputElement;
      expect(searchInput.value).toBe('test search save');
    }
  });
});
