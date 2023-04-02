import { FormProvider, useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import InputDate from './InputDate';

const testData = {
  inputName: 'test_name',
  errorMessage: 'test error message',
  testId: 'test-id',
};

interface InputDate {
  test_name: string;
}

const TestForm = ({ children }: { children: JSX.Element }) => {
  const methods = useForm<InputDate>({
    reValidateMode: 'onSubmit',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(vi.fn())}>
        {children}
        <button type="submit" data-testid="submit-btn">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

describe('InputDate', () => {
  it('Submit empty input', async () => {
    render(
      <TestForm>
        <InputDate {...testData} />
      </TestForm>
    );
    const selectBlock = screen.getByTestId(testData.testId);
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    await userEvent.click(submitButton);
    expect(selectBlock).toHaveTextContent(testData.errorMessage);
  });

  it('Submit valid date', async () => {
    render(
      <TestForm>
        <InputDate {...testData} />
      </TestForm>
    );
    const inputBlock = screen.getByTestId(testData.testId);
    const dateInput = screen.getByTestId('date') as HTMLInputElement;
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    await userEvent.click(dateInput);
    await userEvent.type(dateInput, '3000-01-01');
    await userEvent.click(submitButton);
    expect(inputBlock).not.toHaveTextContent(testData.errorMessage);
  });

  it('Submit invalid date', async () => {
    render(
      <TestForm>
        <InputDate {...testData} />
      </TestForm>
    );
    const inputBlock = screen.getByTestId(testData.testId);
    const dateInput = screen.getByTestId('date') as HTMLInputElement;
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    await userEvent.click(dateInput);
    await userEvent.type(dateInput, '2000-01-01');
    await userEvent.click(submitButton);
    expect(inputBlock).toHaveTextContent(testData.errorMessage);
  });
});
