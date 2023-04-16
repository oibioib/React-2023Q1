import { API } from '@constants';
import { rest } from 'msw';

import { testData } from './data';

export const handlers = [
  rest.get(`${API.URL}${API.ENDPOINT.PHOTOS}`, (req, res, ctx) => {
    const query = req.url.searchParams.get('query');
    switch (query) {
      case API.DEFAULT_QUERY:
        return res(ctx.status(200), ctx.json(testData));
      case 'testQuery':
        return res(ctx.status(200), ctx.json(testData));
      case 'errorQuery':
        return res(ctx.status(403), ctx.json({ errorMessage: `Test error query` }));
    }
  }),
  rest.get(`${API.URL}${API.ENDPOINT.SINGLE_PHOTO}/:id`, (req, res, ctx) => {
    const [data] = testData.results.filter(({ id }) => id === req.params.id);
    return res(ctx.status(200), ctx.json(data));
  }),
];
