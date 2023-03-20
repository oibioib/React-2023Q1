import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Card from './Card';

describe('Card', () => {
  const card = {
    id: 1,
    title: 'Test title',
    description: 'Test description',
    price: 100,
    discountPercentage: 10.0,
    rating: 5.0,
    stock: 100,
    brand: 'Test brand',
    category: 'Test category',
    image: './cards/test.jpg',
  };
  it('Render single card', async () => {
    render(<Card card={card} />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test brand')).toBeInTheDocument();
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });
});
