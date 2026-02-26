// MSW Node server. Configured for use in Vitest — start before tests, reset handlers between tests, close after.
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
