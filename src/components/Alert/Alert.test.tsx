import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Alert from './Alert';

const testData = {
  message: 'Test alert',
  backgroundColor: 'red',
};

describe('Alert message', () => {
  it('Display alert message', () => {
    render(<Alert {...testData} />);
    expect(screen.getByTestId('alert')).toHaveTextContent(testData.message);
  });

  it('Display alert message background color', () => {
    render(<Alert {...testData} />);
    expect(screen.getByTestId('alert').style.getPropertyValue('background-color')).toBe(
      testData.backgroundColor
    );
  });
});
