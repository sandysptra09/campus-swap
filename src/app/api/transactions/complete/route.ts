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

    
        if (transaction.fromUserId !== user.id) {
            return NextResponse.json({ message: 'Only buyer can complete this' }, { status: 403 });
        }

        if (transaction.status !== 'PENDING') {
             return NextResponse.json({ message: 'Transaction already finalized' }, { status: 400 });
        }

        await prisma.$transaction(async (tx) => {
        
            await tx.transaction.update({
                where: { id: transactionId },
                data: { status: 'COMPLETED' }
            });

            await tx.item.update({
                where: { id: transaction.itemId },
                data: { status: 'COMPLETED' }
            });

            await tx.user.update({
                where: { id: transaction.toUserId },
                data: { points: { increment: transaction.points } }
            });

            await tx.pointHistory.create({
                data: {
                    userId: transaction.toUserId,
                    amount: transaction.points,
                    type: 'EARN',
                    description: `Exchange completed: ${transaction.item.title}`,
                }
            });
        });

        return NextResponse.json({ message: 'Exchange successful! Points transferred.' }, { status: 200 });

    } catch (error) {
        console.error('COMPLETE ERROR:', error);
        return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
    }
}