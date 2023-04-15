import { API } from '@constants';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it } from 'vitest';
import 'whatwg-fetch';

import { getPhoto, preparePhoto } from './unsplash';

const testEndpoint = `${API.URL}${API.ENDPOINT.SINGLE_PHOTO}/LBI7cgq3pbM`;

const testData = {
  id: 'LBI7cgq3pbM',
  created_at: '2016-05-03T11:00:28-04:00',
  color: '#60544D',
  likes: 12,
  description: 'A man drinking a coffee.',
  user: {
    name: 'Gilbert Kane',
    profile_image: {
      small:
        'https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=32&w=32',
    },
  },

  urls: {
    regular: 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=1080&fit=max',
    small: 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=400&fit=max',
  },
};

const server = setupServer(
  rest.get(testEndpoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Unsplash Api', () => {
  it('Get photo', async () => {
    await waitFor(async () => {
      const result = await getPhoto('LBI7cgq3pbM');
      const { id } = preparePhoto(result);
      expect(id).toBe(testData.id);
    });
  });
});
