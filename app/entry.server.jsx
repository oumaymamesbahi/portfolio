import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';

export default function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const botCheck = isbot(request.headers.get('user-agent'));

  if (botCheck) {
    responseHeaders.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
  }

  return <RemixServer context={remixContext} url={request.url} />;
}
