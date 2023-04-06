import { FormProvider, useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import InputFile from './InputFile';

const testData = {
  inputName: 'test_name',
  errorMessage: 'test error message',
  testId: 'test-id',
};

interface InputFile {
  test_name: string;
}

const TestForm = ({ children }: { children: JSX.Element }) => {
  const methods = useForm<InputFile>({
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

describe('InputFile', () => {
  global.URL.createObjectURL = vi.fn();

  it('Submit empty input', async () => {
    render(
      <TestForm>
        <InputFile {...testData} />
      </TestForm>
    );
    const selectBlock = screen.getByTestId(testData.testId);
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    await userEvent.click(submitButton);
    expect(selectBlock).toHaveTextContent(testData.errorMessage);
  });

  it('Submit png file', async () => {
    render(
      <TestForm>
        <InputFile {...testData} />
      </TestForm>
    );
    const inputBlock = screen.getByTestId(testData.testId);
    const fileInput = screen.getByTestId('file') as HTMLInputElement;
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    const testFile = new File([''], 'test.png', { type: 'image/png' });
    await userEvent.upload(fileInput, testFile);
    await userEvent.click(submitButton);
    expect(inputBlock).not.toHaveTextContent(testData.errorMessage);
  });

  it('Submit jpg file', async () => {
    render(
      <TestForm>
        <InputFile {...testData} />
      </TestForm>
    );
    const inputBlock = screen.getByTestId(testData.testId);
    const fileInput = screen.getByTestId('file') as HTMLInputElement;
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    const testFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    await userEvent.upload(fileInput, testFile);
    await userEvent.click(submitButton);
    expect(inputBlock).not.toHaveTextContent(testData.errorMessage);
  });

  it('Submit gif file', async () => {
    render(
      <TestForm>
        <InputFile {...testData} />
      </TestForm>
    );
    const inputBlock = screen.getByTestId(testData.testId);
    const fileInput = screen.getByTestId('file') as HTMLInputElement;
    const submitButton = screen.getByTestId('submit-btn') as HTMLFormElement;
    const testFile = new File([''], 'test.gif', { type: 'image/git' });
    await userEvent.upload(fileInput, testFile);
    await userEvent.click(submitButton);
    expect(inputBlock).toHaveTextContent(testData.errorMessage);
  });
});
