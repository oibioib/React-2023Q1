import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import MobileMenu from './MobileMenu';

const testMenuLinks = [
  {
    id: 1,
    route: '/test1',
    title: 'Test1',
    anchor: 'Test1',
  },
  {
    id: 2,
    route: '/test2',
    title: 'Test2',
    anchor: 'Test2',
  },
  {
    id: 3,
    route: '/test3',
    title: 'Test3',
    anchor: 'Test3',
  },
  {
    id: 4,
    route: '/test4',
    title: 'Test4',
    anchor: 'Test4',
  },
];

describe('MobileMenu', () => {
  it('Render all links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MobileMenu links={testMenuLinks} onLinkClick={vi.fn} />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('menu-link')).toHaveLength(testMenuLinks.length);
  });
});
