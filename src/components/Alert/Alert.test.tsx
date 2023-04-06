import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Alert from './Alert';

const testData = {
  type: 'success' as const,
  message: 'Test alert',
  onAnimationEnd: () => {},
};

describe('Alert message', () => {
  it('Display alert message', () => {
    render(<Alert {...testData} />);
    expect(screen.getByText(testData.message)).toBeInTheDocument();
  });
});
