import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromRequest();
        if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { transactionId } = await req.json();

        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
            include: { item: true }
        });

        if (!transaction) return NextResponse.json({ message: 'Not found' }, { status: 404 });

        const isBuyer = transaction.fromUserId === user.id;
        const isSeller = transaction.toUserId === user.id;

        if (!isBuyer && !isSeller) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        if (transaction.status !== 'PENDING') {
             return NextResponse.json({ message: 'Cannot cancel finished transaction' }, { status: 400 });
        }

        await prisma.$transaction(async (tx) => {
            await tx.transaction.update({
                where: { id: transactionId },
                data: { status: 'CANCELED' }
            });

            await tx.item.update({
                where: { id: transaction.itemId },
                data: { status: 'AVAILABLE' }
            });

            await tx.user.update({
                where: { id: transaction.fromUserId },
                data: { points: { increment: transaction.points } }
            });

            await tx.pointHistory.create({
                data: {
                    userId: transaction.fromUserId,
                    amount: transaction.points,
                    type: 'TOPUP', 
                    description: `Refund from canceled exchange: ${transaction.item.title}`,
                }
            });
        });

        return NextResponse.json({ message: 'Transaction canceled. Points refunded.' }, { status: 200 });

    } catch (error) {
        console.error('CANCEL ERROR:', error);
        return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
    }
}