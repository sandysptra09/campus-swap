import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function PATCH(req: Request) {
    try {
        const authUser = await getUserFromRequest();

        if (!authUser) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { message: 'Invalid payload' },
                { status: 400 }
            );
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: authUser.id },
            select: { password: true },
        });

        if (!dbUser?.password) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const isValid = await bcrypt.compare(
            currentPassword,
            dbUser.password
        );

        if (!isValid) {
            return NextResponse.json(
                { message: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
            where: { id: authUser.id },
            data: {
                password: hashedPassword,
                 tokenVersion: {
                    increment: 1, 
                },
            },
        });

        return NextResponse.json(
            { message: 'Password updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('CHANGE PASSWORD ERROR:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
