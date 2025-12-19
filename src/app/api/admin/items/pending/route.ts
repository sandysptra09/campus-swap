import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET() {
    const user = await getUserFromRequest()

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
            { message: 'Forbidden' },
            { status: 403 }
        )
    }

    const items = await prisma.item.findMany({
        where: {
            verificationStatus: 'PENDING',
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            pointValue: true,
            owner: {
                select: {
                    id: true,
                    fullname: true,
                },
            },
            category: {
                select: {
                    name: true,
                },
            },
        },
    })

    return NextResponse.json(items)
}
