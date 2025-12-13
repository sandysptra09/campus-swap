import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    verifyJwt(token);
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ['/api/:path*'],
};
