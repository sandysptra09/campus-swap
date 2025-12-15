import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

export async function GET() {
  const token = (await cookies()).get('auth_token')?.value;
  const payload = token && verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
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
    },
  });

  return NextResponse.json(user);
}
