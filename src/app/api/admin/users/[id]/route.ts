import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const admin = await getUserFromRequest()

    if (!admin || admin.role !== 'ADMIN') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            items: {
                select: {
                    id: true,
                    title: true,
                    status: true,
                    verificationStatus: true,
                },
            },
            wishlist: {
                include: {
                    item: {
                        select: { id: true, title: true },
                    },
                },
            },
            sentTx: true,
            receivedTx: true,
        },
    })

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const admin = await getUserFromRequest()

    if (!admin || admin.role !== 'ADMIN') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const transactionCount = await prisma.transaction.count({
        where: {
            OR: [
                { fromUserId: id },
                { toUserId: id },
            ],
        },
    })

    if (transactionCount > 0) {
        return NextResponse.json(
            { message: 'User has related transactions' },
            { status: 400 }
        )
    }

    await prisma.user.delete({
        where: { id: id },
    })

    return NextResponse.json({ message: 'User deleted' })
}

