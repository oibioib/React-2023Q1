import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import AboutUs from './AboutUs';

describe('About Us', () => {
  it('Render About Us', () => {
    render(<AboutUs />);
    expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
  });
});
