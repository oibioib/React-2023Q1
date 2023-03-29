import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorMessage from './ErrorMessage';

const testData = {
  message: 'Test Error',
};

describe('Error message message', () => {
  it('Display error message', () => {
    render(<ErrorMessage {...testData} />);
    expect(screen.getByTestId('error-message')).toHaveTextContent(testData.message);
  });
});
