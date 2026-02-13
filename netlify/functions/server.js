import * as build from '../../build/server/index.js';

export default async function handler(event, context) {
  try {
    // Extract method and path from Netlify event
    const method = event.requestContext?.http?.method || 'GET';
    const rawPath = event.rawPath || event.path || '/';
    const rawQueryString = event.rawQueryString || '';

    // Get headers, default host if not provided
    const headers = event.headers || {};
    const host = headers.host || 'localhost';

    // Build complete URL
    let urlString = `https://${host}${rawPath}`;
    if (rawQueryString) {
      urlString += `?${rawQueryString}`;
    }

    console.log(`[Netlify Handler] ${method} ${urlString}`);

    // Get request body
    let body = null;
    if (event.body) {
      body = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString()
        : event.body;
    }

    // Create the request
    const request = new Request(urlString, {
      method,
      headers: new Headers(headers),
      body: ['GET', 'HEAD'].includes(method) ? undefined : body,
    });

    // Call the Remix handler
    const response = await build.default(request, {});

    // Get response body
    const responseBody = await response.text();

    // Convert headers to object
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: responseBody,
      isBase64Encoded: false,
    };
  } catch (error) {
    console.error('[Netlify Handler Error]', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: `Internal Server Error: ${error.message}`,
      isBase64Encoded: false,
    };
  }
}
