import * as build from '../../build/server/index.js';
import React from 'react';
import { PassThrough } from 'stream';
import { RemixServer } from '@remix-run/react';
import { renderToPipeableStream } from 'react-dom/server';

export const handler = async function (event, context) {
  try {
    // Parse the Netlify event
    const method = event.requestContext?.http?.method || event.httpMethod || 'GET';
    const path = event.rawPath || event.path || '/';
    const queryString = event.rawQueryString || event.querystring || '';
    const host = event.headers?.host || 'localhost';
    
    // Construct URL
    const url = `https://${host}${path}${queryString ? '?' + queryString : ''}`;
    console.log(`[Remix Handler] ${method} ${url}`);

    // Parse body
    let body = null;
    if (event.body) {
      body = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf-8')
        : event.body;
    }

    // Create Request
    const request = new Request(url, {
      method,
      headers: new Headers(event.headers || {}),
      body: ['GET', 'HEAD'].includes(method) ? undefined : body,
    });

    // Create the router instance
    const { createStaticHandler, createStaticRouter } = await import('@remix-run/router');
    const { query } = createStaticHandler(build.routes, {
      basename: build.basename,
    });

    // Get the context for rendering
    const remixContext = await query(request);

    // If it's a Response (redirect, error, etc), return it directly
    if (remixContext instanceof Response) {
      return remixContext;
    }

    // Render to HTML
    return await new Promise((resolve, reject) => {
      let didError = false;

      const { pipe, abort } = renderToPipeableStream(
        <RemixServer context={remixContext} url={request.url} />,
        {
          onShellReady() {
            const headers = {
              'Content-Type': 'text/html; charset=utf-8',
            };

            const stream = pipe(new PassThrough());
            const response = new Response(stream, {
              status: didError ? 500 : 200,
              headers,
            });

            resolve(response);
          },
          onShellError(error) {
            console.error('[Remix Render Error]', error);
            reject(error);
          },
          onError(error) {
            didError = true;
            console.error('[Remix Error]', error);
          },
        }
      );

      setTimeout(abort, 5000);
    });
  } catch (error) {
    console.error('[Handler Error]', error);
    
    return new Response(
      `Internal Server Error\n\n${error.message}\n\n${error.stack}`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }
}
