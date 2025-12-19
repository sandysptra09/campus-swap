import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function PATCH(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const user = await getUserFromRequest()

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
            { message: 'Forbidden' },
            { status: 403 }
        )
    }

    const item = await prisma.item.findUnique({
        where: { id: params.id },
    })

    if (!item) {
        return NextResponse.json(
            { message: 'Item not found' },
            { status: 404 }
        )
    }

    if (item.verificationStatus === 'APPROVED') {
        return NextResponse.json(
            { message: 'Item already approved' },
            { status: 400 }
        )
    }

    const updated = await prisma.item.update({
        where: { id: params.id },
        data: {
            verificationStatus: 'APPROVED',
        },
    })

    return NextResponse.json(updated)
}
