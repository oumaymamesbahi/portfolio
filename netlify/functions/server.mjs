import * as build from '../../build/server/index.js';

export default async function handler(event) {
  try {
    // Extract request details from Netlify event
    const method = event.requestContext?.http?.method || 'GET';
    const rawPath = event.rawPath || '/';
    const rawQueryString = event.rawQueryString || '';
    const host = event.headers?.host || 'localhost';

    // Build the complete URL
    const url = `https://${host}${rawPath}${rawQueryString ? '?' + rawQueryString : ''}`;

    console.log(`[Remix] ${method} ${url}`);

    // Parse request body
    let body = null;
    if (event.body) {
      body = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf-8')
        : event.body;
    }

    // Create Web API Request
    const request = new Request(url, {
      method,
      headers: new Headers(event.headers || {}),
      body: ['GET', 'HEAD'].includes(method) ? undefined : body,
    });

    // Get the handler from build
    const handler = build.default;
    
    if (typeof handler !== 'function') {
      console.error('[Build Error] Available exports:', Object.keys(build));
      throw new Error(`Expected handler to be a function, got ${typeof handler}`);
    }

    // Call Remix handler and return the Response directly
    const response = await handler(request);
    
    if (!(response instanceof Response)) {
      throw new Error(`Handler did not return a Response, got ${typeof response}`);
    }

    return response;
  } catch (error) {
    console.error('[Netlify Handler Error]', error);
    return new Response(`Internal Server Error: ${error.message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
