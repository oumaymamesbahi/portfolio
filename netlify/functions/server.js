// @remix-run/netlify v1 is not compatible with Remix v2
// We need to create a custom handler using @remix-run/server-runtime

import { createRequestHandler as createRemixRequestHandler } from '@remix-run/server-runtime';

let handler;

export const handler = async (event, context) => {
  // Lazy load the build on first request
  if (!handler) {
    const build = await import('../../build/server/index.js');
    handler = createRemixRequestHandler(build, process.env.NODE_ENV);
  }

  // Convert Netlify event to Web Request
  const url = new URL(event.rawUrl);

  const request = new Request(url.toString(), {
    method: event.httpMethod,
    headers: new Headers(event.headers),
    body: event.body && event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString()
      : event.body,
  });

  try {
    const response = await handler(request, {
      netlifyContext: context,
    });

    // Convert Web Response to Netlify response
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      statusCode: response.status,
      headers,
      body: await response.text(),
    };
  } catch (error) {
    console.error('Error handling request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    };
  }
};

