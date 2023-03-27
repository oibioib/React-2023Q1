import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Card from './Card';

describe('Card', () => {
  const card = {
    id: 1,
    title: 'Test title',
    brand: 'Test brand',
    image: './cards/test.jpg',
    date: '2023-01-01',
    condition: 'new',
    delivery: true,
  };
  it('Render single card', async () => {
    render(<Card card={card} />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test brand')).toBeInTheDocument();
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });
});
