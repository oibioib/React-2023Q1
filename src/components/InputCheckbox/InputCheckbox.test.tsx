import { FormProvider, useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import InputCheckbox from './InputCheckbox';

const testData = {
  inputName: 'test_name',
  labelText: 'test label',
  testId: 'test-id',
};

interface InputCheckbox {
  test_name: string;
}

const TestForm = ({ children }: { children: JSX.Element }) => {
  const methods = useForm<InputCheckbox>({
    reValidateMode: 'onSubmit',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(vi.fn())}>{children}</form>
    </FormProvider>
  );
};

describe('InputCheckbox', () => {
  it('Select checkbox', async () => {
    render(
      <TestForm>
        <InputCheckbox {...testData} />
      </TestForm>
    );
    const checkbox = screen.getByLabelText(testData.labelText) as HTMLInputElement;
    const label = screen.getByText(testData.labelText);
    await userEvent.click(label);
    expect(checkbox.checked).toBeTruthy();
  });
});
