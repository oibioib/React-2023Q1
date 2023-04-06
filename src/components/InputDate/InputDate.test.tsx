import { FormProvider, useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import InputDate from './InputDate';

const testData = {
  inputName: 'test_name',
  errorMessage: 'test error message',
  testId: 'test-id',
  submitTest: 'Submit test form',
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
        <button type="submit">{testData.submitTest}</button>
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
    const submitButton = screen.getByText(testData.submitTest);
    await userEvent.click(submitButton);
    const errorBlock = screen.queryByText(testData.errorMessage);
    expect(errorBlock).toBeInTheDocument();
  });

  it('Submit valid date', async () => {
    render(
      <TestForm>
        <InputDate {...testData} />
      </TestForm>
    );
    const dateInput = screen.getByLabelText(testData.inputName);
    const submitButton = screen.getByText(testData.submitTest);
    await userEvent.click(dateInput);
    await userEvent.type(dateInput, '3000-01-01');
    await userEvent.click(submitButton);
    const errorBlock = screen.queryByText(testData.errorMessage);
    expect(errorBlock).not.toBeInTheDocument();
  });

  it('Submit invalid date', async () => {
    render(
      <TestForm>
        <InputDate {...testData} />
      </TestForm>
    );
    const dateInput = screen.getByLabelText(testData.inputName);
    const submitButton = screen.getByText(testData.submitTest);
    await userEvent.click(dateInput);
    await userEvent.type(dateInput, '2000-01-01');
    await userEvent.click(submitButton);
    const errorBlock = screen.queryByText(testData.errorMessage);
    expect(errorBlock).toBeInTheDocument();
  });
});
