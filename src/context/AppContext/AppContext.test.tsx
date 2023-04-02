import { useContext, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

import { AppContext } from './AppContext';

const testId = {
  search: 'search-value',
  changeSearch: 'change-search-value',
};

const searchValues = {
  init: 'test search',
  change: 'another test search',
};

const AppContextProviderMock = ({ children }: { children: JSX.Element }) => {
  const [searchValue, setSearchValue] = useState<string>(searchValues.init);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const contextValue = {
    search: {
      searchValue,
      setSearchValue,
    },
    modal: {
      modalContent,
      setModalContent,
    },
  };
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

const TestChild = () => {
  const {
    search: { searchValue, setSearchValue },
  } = useContext(AppContext);

  return (
    <>
      <div data-testid={testId.search}>{searchValue}</div>
      <button data-testid={testId.changeSearch} onClick={() => setSearchValue(searchValues.change)}>
        Change search value
      </button>
    </>
  );
};

describe('AppContext', () => {
  it('Render default search value', () => {
    render(
      <AppContextProviderMock>
        <TestChild />
      </AppContextProviderMock>
    );
    expect(screen.getByTestId(testId.search)).toHaveTextContent(searchValues.init);
  });

  it('Change search value', async () => {
    render(
      <AppContextProviderMock>
        <TestChild />
      </AppContextProviderMock>
    );

    const changeSearchValueButton = screen.getByTestId(testId.changeSearch);
    await userEvent.click(changeSearchValueButton);
    expect(screen.getByTestId(testId.search)).toHaveTextContent(searchValues.change);
  });
});
