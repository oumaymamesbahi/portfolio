import { createRequestHandler } from '@remix-run/netlify';
import * as build from './build/server/index.js';

const handler = createRequestHandler({ build, mode: 'production' });

// Netlify expects the handler to be the default export
export default handler;
