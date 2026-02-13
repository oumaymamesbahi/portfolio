import { createRequestHandler } from '@remix-run/netlify';
import * as build from '../../build/server/index.js';

const handler = createRequestHandler({ build });

export { handler };
