import { useContext, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

import { AppContext } from './AppContext';

const testId = {
  search: 'search-value',
  changeSearch: 'change-search-value',
};

const TestElement = ({ message }: { message: string }) => <h1>{message}</h1>;

const modalElementText = {
  init: 'init',
  change: 'change',
};

const AppContextProviderMock = ({ children }: { children: JSX.Element }) => {
  const initElement = <TestElement message={modalElementText.init} />;
  const [modalContent, setModalContent] = useState<JSX.Element | null>(initElement);

  const contextValue = {
    modal: {
      modalContent,
      setModalContent,
    },
  };
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

const TestChild = () => {
  const {
    modal: { modalContent, setModalContent },
  } = useContext(AppContext);

  return (
    <>
      <div data-testid={testId.search}>{modalContent}</div>
      <button
        data-testid={testId.changeSearch}
        onClick={() => setModalContent(<TestElement message={modalElementText.change} />)}
      >
        Change modal content
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
    expect(screen.getByTestId(testId.search)).toHaveTextContent(modalElementText.init);
  });

  it('Change search value', async () => {
    render(
      <AppContextProviderMock>
        <TestChild />
      </AppContextProviderMock>
    );

    const changeSearchValueButton = screen.getByTestId(testId.changeSearch);
    await userEvent.click(changeSearchValueButton);
    expect(screen.getByTestId(testId.search)).toHaveTextContent(modalElementText.change);
  });
});
