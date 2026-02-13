import * as build from '../../build/server/index.js';

export default async function handler(event, context) {
  // Construct the request URL
  const proto = event.headers['x-forwarded-proto'] || 'https';
  const host = event.headers['x-forwarded-host'] || event.headers.host;
  const path = event.path || '/';
  const search = event.querystring ? `?${event.querystring}` : '';
  const url = `${proto}://${host}${path}${search}`;

  // Create headers
  const headers = new Headers(event.headers || {});

  // Handle body
  let body = null;
  if (event.body) {
    body = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf-8')
      : event.body;
  }

  // Create Request
  const request = new Request(url, {
    method: event.httpMethod || event.requestContext?.http?.method || 'GET',
    headers,
    body: ['GET', 'HEAD'].includes(event.httpMethod) ? null : body,
  });

  // Call remix handler
  const response = await build.default(request, {});

  // Convert to Netlify format
  const responseBody = await response.text();

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers),
    body: responseBody,
    isBase64Encoded: false,
  };
}
