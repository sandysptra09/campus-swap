import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET() {
    const admin = await getUserFromRequest()

    if (!admin || admin.role !== 'ADMIN') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const users = await prisma.user.findMany({
        where: { role: 'USER' },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            avatarUrl: true,
            fullname: true,
            email: true,
            isActive: true,
            createdAt: true,
            _count: {
                select: {
                    items: true,
                    wishlist: true,
                    sentTx: true,
                    receivedTx: true,
                },
            },
        },
    })

    return NextResponse.json(users)
}
