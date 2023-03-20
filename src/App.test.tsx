import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('Render app', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main');
  });
});
