import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt';

export async function PATCH(req: Request) {
  const token = (await cookies()).get('auth_token')?.value;
  const payload = token && verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { fullname, major, contact } = body;

  if (!fullname || fullname.trim().length < 3) {
    return NextResponse.json(
      { message: 'Full name is required' },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id: payload.id },
    data: {
      fullname,
      major,
      contact,
    },
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
