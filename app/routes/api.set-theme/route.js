import { json, redirect } from '@remix-run/node';
import { createCookieSessionStorage } from '@remix-run/node';

export async function action({ request }) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const formData = await request.formData();
  const theme = formData.get('theme');

  if (!theme || !['light', 'dark'].includes(theme)) {
    return json({ error: 'Invalid theme' }, { status: 400 });
  }

  const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET || ' '],
      secure: true,
    },
  });

  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
