import { FormProvider, useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import Select from './Select';

const testData = {
  selectName: 'test_name',
  options: ['option1', 'option2', 'option3'],
  placeholder: 'test placeholder',
  errorMessage: 'test error message',
  testId: 'test-id',
};

interface Select {
  test_name: string;
}

const TestForm = ({ children }: { children: JSX.Element }) => {
  const methods = useForm<Select>({
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

describe('Select', () => {
  it('Submit without selecting option', async () => {
    render(
      <TestForm>
        <Select {...testData} />
      </TestForm>
    );
    const selectBlock = screen.getByTestId(testData.testId);
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    await userEvent.click(submitButton);
    expect(selectBlock).toHaveTextContent(testData.errorMessage);
  });

  it('Select an option', async () => {
    render(
      <TestForm>
        <Select {...testData} />
      </TestForm>
    );
    const select = screen.getByRole('combobox');
    const [option] = testData.options;
    const testOption = screen.getByRole('option', { name: option });
    await userEvent.selectOptions(select, testOption);
    const selectedOption = screen.getByRole('option', { name: option }) as HTMLOptionElement;
    expect(selectedOption.selected).toBeTruthy;
  });

  it('Select an option an submit', async () => {
    render(
      <TestForm>
        <Select {...testData} />
      </TestForm>
    );
    const selectBlock = screen.getByTestId(testData.testId);
    const select = screen.getByRole('combobox');
    const [, option] = testData.options;
    const testOption = screen.getByRole('option', { name: option });
    await userEvent.selectOptions(select, testOption);
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    await userEvent.click(submitButton);
    expect(selectBlock).not.toHaveTextContent(testData.errorMessage);
  });
});
