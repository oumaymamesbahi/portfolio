// Import the Remix server build
import * as build from '../../build/server/index.js';

export default async function netlifyHandler(event) {
  try {
    const method = event.requestContext?.http?.method || 'GET';
    const rawPath = event.rawPath || '/';
    const rawQueryString = event.rawQueryString || '';
    const host = event.headers?.host || 'localhost';

    const url = `https://${host}${rawPath}${rawQueryString ? '?' + rawQueryString : ''}`;

    console.log(`[Remix] ${method} ${url}`);
    console.log('[Build exports]', Object.keys(build));

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

    // Try to find the handler function
    // Remix v2 exports it as the default export
    let handler = build.default;
    
    // If no default export, try to find a handler-like function
    if (!handler) {
      for (const [key, value] of Object.entries(build)) {
        if (typeof value === 'function' && key.includes('handler')) {
          handler = value;
          break;
        }
      }
    }

    if (!handler || typeof handler !== 'function') {
      const debugInfo = {
        hasDefault: !!build.default,
        defaultType: typeof build.default,
        keys: Object.keys(build),
      };
      console.error('[Build Error]', debugInfo);
      
      return new Response(
        `Internal Server Error: No handler found\n\n${JSON.stringify(debugInfo, null, 2)}`,
        { status: 500, headers: { 'Content-Type': 'text/plain' } }
      );
    }

    const response = await handler(request);

    if (!(response instanceof Response)) {
      throw new Error(`Handler returned ${typeof response}, expected Response`);
    }

    return response;
  } catch (error) {
    console.error('[Handler Error]', error);
    return new Response(
      `Internal Server Error: ${error.message}`,
      { status: 500, headers: { 'Content-Type': 'text/plain' } }
    );
  }
}
