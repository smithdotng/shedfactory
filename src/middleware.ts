import { NextResponse, type NextRequest } from 'next/server';

// Basic auth for /admin. Fails closed: if credentials aren't configured, admin is locked.
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USERNAME;
  const pass = process.env.ADMIN_PASSWORD;
  const header = req.headers.get('authorization') || '';

  if (user && pass && header.startsWith('Basic ')) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(':');
      if (u === user && rest.join(':') === pass) return NextResponse.next();
    } catch {
      /* fall through */
    }
  }

  return new NextResponse(user && pass ? 'Authentication required' : 'Admin is not configured', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Shedfactory Admin"' },
  });
}

export const config = { matcher: ['/admin', '/admin/:path*'] };
