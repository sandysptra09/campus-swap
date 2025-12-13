import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/protected')) {
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const payload = verifyJwt(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  if (pathname.startsWith('/user/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/dashboard/:path*',
    '/user/dashboard/:path*',
  ],
};
