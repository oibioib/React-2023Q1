import { FormProvider, useForm } from 'react-hook-form';

import { toTitleCase } from '@helpers';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import InputRadio from './InputRadio';

const testData = {
  groupName: 'test_name',
  options: ['test1', 'test2'],
  errorMessage: 'test error message',
  testId: 'test-id',
};

interface InputRadio {
  test_name: string;
}

const TestForm = ({ children }: { children: JSX.Element }) => {
  const methods = useForm<InputRadio>({
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

describe('InputRadio', () => {
  it('Submit empty input', async () => {
    render(
      <TestForm>
        <InputRadio {...testData} />
      </TestForm>
    );
    const selectBlock = screen.getByTestId(testData.testId);
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    await userEvent.click(submitButton);
    expect(selectBlock).toHaveTextContent(testData.errorMessage);
  });

  it('Select option', async () => {
    render(
      <TestForm>
        <InputRadio {...testData} />
      </TestForm>
    );
    const inputBlock = screen.getByTestId(testData.testId);
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    const [optionName] = testData.options;
    const label = screen.getByText(toTitleCase(optionName));
    await userEvent.click(label);
    await userEvent.click(submitButton);
    expect(inputBlock).not.toHaveTextContent(testData.errorMessage);
  });
});
