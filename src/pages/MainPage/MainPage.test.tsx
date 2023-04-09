import { API } from '@constants';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it } from 'vitest';

import MainPage from './MainPage';

const testData = {
  results: [
    {
      id: 'LBI7cgq3pbM',
      created_at: '2016-05-03T11:00:28-04:00',
      color: '#60544D',
      likes: 12,
      description: 'Test description',
      user: {
        name: 'Test author',
        profile_image: {
          small:
            'https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=32&w=32',
        },
      },
      urls: {
        regular: 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=1080&fit=max',
        small: 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=400&fit=max',
      },
    },
    {
      id: 'LBI7cgq3pbM2',
      created_at: '2016-05-03T11:00:28-04:00',
      color: '#60544D',
      likes: 12,
      description: 'Test description2',
      user: {
        name: 'Test author2',
        profile_image: {
          small:
            'https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=32&w=32',
        },
      },
      urls: {
        regular: 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=1080&fit=max',
        small: 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=400&fit=max',
      },
    },
  ],
  total: 2,
  total_pages: 2,
};

const server = setupServer(
  rest.get(`${API.URL}${API.ENDPOINT.PHOTOS}`, (req, res, ctx) => {
    const query = req.url.searchParams.get('query');

    switch (query) {
      case API.DEFAULT_QUERY:
        return res(ctx.status(200), ctx.json(testData));
      case 'testQuery':
        return res(ctx.status(200), ctx.json(testData));
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Main page', () => {
  it('Render with default search', async () => {
    render(<MainPage />);
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'photo' }).length).toBe(2);
    });
  });
});
