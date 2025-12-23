import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const admin = await getUserFromRequest();
        
        if (!admin || admin.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const [totalUsers, totalItems, pendingItems, totalTransactions] = await Promise.all([
            prisma.user.count(), 
            prisma.item.count(), 
            prisma.item.count({ where: { verificationStatus: 'PENDING' } }), 
            prisma.transaction.count() 
        ]);

        return NextResponse.json({
            totalUsers,
            totalItems,
            pendingItems,
            totalTransactions
        }, { status: 200 });

    } catch (error) {
        console.error('ADMIN STATS ERROR:', error);
        return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
    }
}