import { setupServer } from 'msw/node';

import { handlers } from './handlers';

const apiServer = setupServer(...handlers);

export default apiServer;
