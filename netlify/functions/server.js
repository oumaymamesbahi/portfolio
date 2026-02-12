import { createRequestHandler } from '@remix-run/netlify';

export const handler = createRequestHandler({
  getLoadContext: async (event, context) => {
    return {
      netlifyContext: context,
    };
  },
});

