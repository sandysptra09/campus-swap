import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function requireUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) redirect('/login');

  const payload = verifyJwt(token);
  if (!payload) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      fullname: true,
      email: true,
      studentId: true,
      role: true,
      points: true,
    },
  });

  if (!user) redirect('/login');

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'ADMIN') redirect('/unauthorized');
  return user;
}
