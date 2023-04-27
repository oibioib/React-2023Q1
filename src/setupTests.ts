import { apiServer } from '@mocks';
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import 'whatwg-fetch';

expect.extend(matchers);

beforeAll(() => apiServer.listen());
afterEach(() => apiServer.resetHandlers());
afterAll(() => apiServer.close());
