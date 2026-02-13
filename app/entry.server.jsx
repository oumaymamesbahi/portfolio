import { PassThrough } from 'stream';
import { RemixServer } from '@remix-run/react';
import { renderToPipeableStream } from 'react-dom/server';
import { isbot } from 'isbot';

const ABORT_DELAY = 5_000;

export default function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = false;

    const botCheck = isbot(request.headers.get('user-agent'));
    if (botCheck) {
      responseHeaders.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
    }

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          responseHeaders.set('Content-Type', 'text/html; charset=utf-8');

          resolve(
            new Response(pipe(new PassThrough()), {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
