import { useEffect, useRef, useState } from 'react';
import { useBeforeUnload } from 'react-router-dom';

import { STORAGE_KEYS, TEXT } from '@constants';
import { MainPageContext } from '@context';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

import Search from './Search';

const ProviderMock = ({ children }: { children: JSX.Element }) => {
  const initSearchValue = localStorage.getItem(STORAGE_KEYS.SEARCH_VALUE) ?? '';
  const [searchValue, setSearchValue] = useState<string>(initSearchValue);
  const value = useRef<string>(initSearchValue);

  const saveSearchValue = () => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, value.current);
  };

  useEffect(() => {
    value.current = searchValue;
  }, [searchValue]);

  useEffect(() => saveSearchValue, []);
  useBeforeUnload(saveSearchValue);

  const contextValue = {
    searchValue,
    setSearchValue,
  };
  return <MainPageContext.Provider value={contextValue}>{children}</MainPageContext.Provider>;
};

describe('Search', () => {
  it('Render search placeholder', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(TEXT.PLACEHOLDERS.SEARCH)).toBeInTheDocument();
  });

  it('Change search value', async () => {
    render(
      <ProviderMock>
        <Search />
      </ProviderMock>
    );
    const searchInput = screen.getByTestId('search') as HTMLInputElement;
    await userEvent.type(searchInput, 'test search input');
    expect(searchInput.value).toBe('test search input');
  });

  it('Clear search value', async () => {
    render(
      <ProviderMock>
        <Search />
      </ProviderMock>
    );
    const searchInput = screen.getByTestId('search') as HTMLInputElement;
    await userEvent.type(searchInput, 'test search input');
    const searchClear = screen.getByTestId('search-clear') as HTMLSpanElement;
    await userEvent.click(searchClear);
    expect(searchInput.value).toBe('');
  });

  it('Save and Load search value', async () => {
    const testValue1 = 'test search saved';
    const testValue2 = 'test search to save';

    localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, testValue1);

    const { unmount } = render(
      <ProviderMock>
        <Search />
      </ProviderMock>
    );

    const searchInput = screen.getByTestId('search') as HTMLInputElement;
    expect(searchInput.value).toBe(testValue1);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, testValue2);
    unmount();
    const searchValueFromLocalstorage = localStorage.getItem(STORAGE_KEYS.SEARCH_VALUE);
    expect(searchValueFromLocalstorage).toBe(testValue2);
    expect(searchValueFromLocalstorage).toBe(testValue2);
  });
});
