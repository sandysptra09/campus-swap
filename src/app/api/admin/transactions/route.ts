import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { TransactionStatus } from '@prisma/client';

export async function GET(req: NextRequest) {
    try {
        const admin = await getUserFromRequest();
        if (!admin) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (admin.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const statusParam = req.nextUrl.searchParams.get('status');

        let whereCondition = undefined;

        if (statusParam) {
            if (
                !Object.values(TransactionStatus).includes(
                    statusParam as TransactionStatus
                )
            ) {
                return NextResponse.json(
                    { message: 'Invalid transaction status' },
                    { status: 400 }
                );
            }

            whereCondition = {
                status: statusParam as TransactionStatus,
            };
        }

        const transactions = await prisma.transaction.findMany({
            where: whereCondition,
            orderBy: { createdAt: 'desc' },
            include: {
                item: {
                    select: {
                        id: true,
                        title: true,
                        pointValue: true,
                        status: true,
                        imageUrl: true,
                    },
                },
                fromUser: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
                toUser: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
            },
        });

        return NextResponse.json(
            {
                total: transactions.length,
                transactions,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('ADMIN GET TRANSACTIONS ERROR:', error);
        return NextResponse.json(
            { message: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}

