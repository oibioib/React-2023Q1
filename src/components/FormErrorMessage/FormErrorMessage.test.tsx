import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FormErrorMessage from './FormErrorMessage';

const testData = {
  message: 'Test Error',
};

describe('Error message message', () => {
  it('Display error message', () => {
    render(<FormErrorMessage {...testData} />);
    expect(screen.getByTestId('error-message')).toHaveTextContent(testData.message);
  });
});
