import { FormProvider, useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import InputText from './InputText';

const testData = {
  inputName: 'test_name',
  placeholder: 'test placeholder',
  errorMessage: 'test error message',
  testId: 'test-id',
};

interface InputText {
  test_name: string;
}

const TestForm = ({ children }: { children: JSX.Element }) => {
  const methods = useForm<InputText>({
    reValidateMode: 'onSubmit',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(vi.fn())}>{children}</form>
    </FormProvider>
  );
};

describe('InputText', () => {
  it('Render input placeholder', () => {
    render(
      <TestForm>
        <InputText {...testData} />
      </TestForm>
    );
    const textInput = screen.getByRole('textbox') as HTMLInputElement;
    expect(textInput.placeholder).toBe(testData.placeholder);
  });

  it('Submit empty input', async () => {
    render(
      <TestForm>
        <InputText {...testData} />
      </TestForm>
    );
    const textInput = screen.getByRole('textbox');
    await userEvent.type(textInput, '{enter}');
    const errorBlock = screen.queryByText(testData.errorMessage);
    expect(errorBlock).toBeInTheDocument();
  });

  it('Submit valid text', async () => {
    render(
      <TestForm>
        <InputText {...testData} />
      </TestForm>
    );
    const textInput = screen.getByRole('textbox');
    await userEvent.type(textInput, 'test text{enter}');
    const errorBlock = screen.queryByText(testData.errorMessage);
    expect(errorBlock).not.toBeInTheDocument();
  });
});
