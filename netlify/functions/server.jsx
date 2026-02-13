import * as build from '../../build/server/index.js';
import { PassThrough } from 'stream';
import { renderToPipeableStream } from 'react-dom/server';
import React from 'react';
import { RemixServer } from '@remix-run/react';
import { createStaticHandler } from '@remix-run/router';

export const handler = async (event) => {
  try {
    const method = event.requestContext?.http?.method || 'GET';
    const path = event.rawPath || '/';
    const queryString = event.rawQueryString || '';
    const host = event.headers?.host || 'localhost';
    
    const url = `https://${host}${path}${queryString ? '?' + queryString : ''}`;
    console.log(`[Handler] ${method} ${url}`);

    let body = null;
    if (event.body) {
      body = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf-8')
        : event.body;
    }

    const request = new Request(url, {
      method,
      headers: new Headers(event.headers || {}),
      body: ['GET', 'HEAD'].includes(method) ? undefined : body,
    });

    // Use static handler to get remix context
    const staticHandler = createStaticHandler(build.routes);
    const remixContext = await staticHandler.query(request);

    if (remixContext instanceof Response) {
      return remixContext;
    }

    // Render the server component
    const remixServerComponent = React.createElement(RemixServer, {
      context: remixContext,
      url: request.url,
    });

    return new Promise((resolve, reject) => {
      let didError = false;

      const { pipe, abort } = renderToPipeableStream(remixServerComponent, {
        onShellReady() {
          const stream = pipe(new PassThrough());
          
          resolve(
            new Response(stream, {
              status: didError ? 500 : 200,
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
              },
            })
          );
        },
        onShellError(error) {
          console.error('[Render Error]', error);
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error('[Error]', error);
        },
      });

      setTimeout(abort, 5000);
    });
  } catch (error) {
    console.error('[Handler Error]', error);
    return new Response(
      `Internal Server Error: ${error.message}`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }
};
