import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import cards from '../../data/cards.json';
import Cards from './Cards';

describe('Cards', () => {
  it('Render all cards', async () => {
    render(<Cards cards={cards} />);
    const renderedCards = screen.getAllByTestId('card');
    expect(renderedCards).toHaveLength(cards.length);
  });
});
