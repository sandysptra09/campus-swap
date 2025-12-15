import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

export async function GET() {
  const token = (await cookies()).get('auth_token')?.value;
   if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyJwt(token);
  if (!payload) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      fullname: true,
      email: true,
      studentId: true,
      role: true,
      points: true,
      major: true,
      contact: true,
      avatarUrl: true,
      tokenVersion: true,
    },
  });

  if (!dbUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (dbUser.tokenVersion !== payload.tokenVersion) {
    return NextResponse.json(
      { message: 'Session expired' },
      { status: 401 }
    );
  }

  return NextResponse.json(dbUser);
}
