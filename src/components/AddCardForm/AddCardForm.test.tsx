import { ADD_CARD_FORM } from '@constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import AddCardForm from './AddCardForm';

const testData = {
  title: 'Test title',
};

const onSubmit = vi.fn();

describe('AddCardForm', () => {
  it('Enter title into input', async () => {
    render(<AddCardForm onSubmit={onSubmit} />);
    const titleInput = screen.getByPlaceholderText(ADD_CARD_FORM.PLACEHOLDER.TITLE);
    await userEvent.type(titleInput, testData.title);
    expect(titleInput).toHaveValue(testData.title);
  });
});
