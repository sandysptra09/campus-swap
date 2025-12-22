import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromRequest();
        if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        if (user.role !== 'USER') {
             return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const { itemId } = await req.json();

        const item = await prisma.item.findUnique({
            where: { id: itemId },
        });

        if (!item) return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        
        if (item.status !== 'AVAILABLE') {
             return NextResponse.json({ message: 'Item is currently not available' }, { status: 400 });
        }
        if (item.verificationStatus !== 'APPROVED') {
             return NextResponse.json({ message: 'Item not verified yet' }, { status: 400 });
        }
        if (item.ownerId === user.id) {
             return NextResponse.json({ message: 'Cannot claim your own item' }, { status: 400 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { points: true },
        });

        if (!dbUser || dbUser.points < item.pointValue) {
            return NextResponse.json({ message: 'Insufficient points' }, { status: 400 });
        }

        const transaction = await prisma.$transaction(async (tx) => {

            await tx.user.update({
                where: { id: user.id },
                data: { points: { decrement: item.pointValue } }
            });

            await tx.item.update({
                where: { id: item.id },
                data: { status: 'IN_CLAIM' }
            });

            const newTx = await tx.transaction.create({
                data: {
                    itemId: item.id,
                    fromUserId: user.id,
                    toUserId: item.ownerId,
                    points: item.pointValue,
                    status: 'PENDING',
                },
            });

            await tx.pointHistory.create({
                data: {
                    userId: user.id,
                    amount: item.pointValue,
                    type: 'SPEND',
                    description: `Held for exchange request: ${item.title}`,
                }
            });

            return newTx;
        });

        return NextResponse.json(
            { message: 'Exchange requested! Points held securely.', transaction },
            { status: 201 }
        );

    } catch (error) {
        console.error('CLAIM ERROR:', error);
        return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
    }
}