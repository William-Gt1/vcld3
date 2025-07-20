import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { server } from './tests/mocks/server';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); 